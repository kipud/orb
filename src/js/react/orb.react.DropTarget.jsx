/* global module, require, react */
/*jshint eqnull: true*/

'use strict';

var React = typeof window === 'undefined' ? require('react') : window.React,
    DragManager = require('./orb.react.DragManager.jsx'),
    DropIndicator = require('./orb.react.DropIndicator.jsx'),    
    axe = require('../orb.axe'),
    dtid = 0;

module.exports = React.createClass({
	getInitialState: function () {
		this.dtid = ++dtid;
		return {
			isover: false
		};
	},
  	componentDidMount: function() {
  		DragManager.registerTarget(this, this.props.axetype, this.onDragOver, this.onDragEnd);
  	},
	componentWillUnmount : function() {
		DragManager.unregisterTarget(this);
	},
	onDragOver: function(callback) {
		if(this.isMounted()) {
			this.setState({
				isover: true
			}, callback);
		} else if(callback) {
			callback();
		}
	},
	onDragEnd: function(callback) {
		if(this.isMounted()) {
			this.setState({
				isover: false
			}, callback);
		} else if(callback) {
			callback();
		}
	},
	render: function() {
		var self = this;
		var setTR = false;
		if (self.props.axetype === axe.Type.ROWS) {
			setTR = true;
		}

		var buttons = this.props.buttons.map(function(button, index) {
			if(index < self.props.buttons.length - 1) {
				if (setTR) {
					return [
						<td><DropIndicator isFirst={index === 0} position={index} axetype={self.props.axetype}></DropIndicator></td>,
						<td>{ button }</td>
					];
				} else {
					return [
						<div><DropIndicator isFirst={index === 0} position={index} axetype={self.props.axetype}></DropIndicator></div>,
						<div>{ button }</div>
					];
				}
			} else {
				if (setTR) {
					return [
						<td><DropIndicator isFirst={index === 0} position={index} axetype={self.props.axetype}></DropIndicator></td>,
						<td>{ button }</td>,
						<td><DropIndicator isLast={true} position={null} axetype={self.props.axetype}></DropIndicator></td>
					];

				} else {
					return [
						<div><DropIndicator isFirst={index === 0} position={index} axetype={self.props.axetype}></DropIndicator></div>,
						<div>{ button }</div>,
						<div><DropIndicator isLast={true} position={null} axetype={self.props.axetype}></DropIndicator></div>
					];
				}
			}
		});

		var style = self.props.axetype === axe.Type.ROWS ? { position: 'absolute', left: 0, bottom: 11 } : {height: 'auto'};
		var dropTargetTableStyle = setTR ? {} : {width: '100%'};

		return <div className={'drp-trgt' + (this.state.isover ? ' drp-trgt-over' : '') + (buttons.length === 0 ? ' drp-trgt-empty' : '')} style={style}>
			<table style={dropTargetTableStyle}>
			<tbody>
				<tr>
					<td>{buttons}</td>
				</tr>
			</tbody>
			</table>
		</div>;
	}
});