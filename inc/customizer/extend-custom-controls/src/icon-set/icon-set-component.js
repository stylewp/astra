import PropTypes from 'prop-types';
import classnames from 'classnames';

import ResponsiveControl from '../common/responsive.js';
import Icons from '../common/icons.js';

const { __ } = wp.i18n;

const { ButtonGroup, Dashicon, Tooltip, Button } = wp.components;

const { Component, Fragment } = wp.element;
class IconSetComponent extends Component {
	constructor() {
		super( ...arguments );
		this.updateValues = this.updateValues.bind( this );
		let value = this.props.control.setting.get();
		let defaultParams = {
			layout: {
				standard: {
					tooltip: __( 'Background Fullwidth, Content Contained', 'astra-builder' ),
					name: __( 'Standard', 'astra-builder' ),
					icon: '',
				},
				fullwidth: {
					tooltip: __( 'Background & Content Fullwidth', 'astra-builder' ),
					name: __( 'Fullwidth', 'astra-builder' ),
					icon: '',
				},
				contained: {
					tooltip: __( 'Background & Content Contained', 'astra-builder' ),
					name: __( 'Contained', 'astra-builder' ),
					icon: '',
				},
			},
			responsive: true,
		};
		this.controlParams = this.props.control.params.input_attrs ? {
			...defaultParams,
			...this.props.control.params.input_attrs,
		} : defaultParams;
		let responsiveDefault = {
			'mobile': '',
			'tablet': '',
			'desktop': 'standard'
		};
		let nonResponsiveDefault = 'standard';
		let baseDefault;
		if ( this.controlParams.responsive ) {
			baseDefault = responsiveDefault;
			this.defaultValue = this.props.control.params.default ? {
				...baseDefault,
				...this.props.control.params.default
			} : baseDefault;
		} else {
			baseDefault = nonResponsiveDefault;
			this.defaultValue = this.props.control.params.default ? this.props.control.params.default : baseDefault;
		}
		if ( this.controlParams.responsive ) {
			value = value ? {
				...JSON.parse( JSON.stringify( this.defaultValue ) ),
				...value
			} : JSON.parse( JSON.stringify( this.defaultValue ) );
		} else {
			value = value ? value : this.defaultValue;
		}
		this.state = {
			currentDevice: 'desktop',
			value: value,
		};
	}
	render() {
		const responsiveControlLabel = (
			<Fragment>
				{ this.state.currentDevice !== 'desktop' && (
					<Tooltip text={ __( 'Reset Device Values', 'astra-builder' ) }>
						<Button
							className="reset ahfb-reset"
							disabled={ ( this.state.value[this.state.currentDevice] === this.defaultValue[this.state.currentDevice] ) }
							onClick={ () => {
								let value = this.state.value;
								value[this.state.currentDevice] = this.defaultValue[this.state.currentDevice];
								this.setState( value );
								this.updateValues( value );
							} }
						>
							<Dashicon icon='image-rotate' />
						</Button>
					</Tooltip>
				) }
				{ this.props.control.params.label &&
					this.props.control.params.label
				}
			</Fragment>
		);
		const controlLabel = (
			<Fragment>
				<Tooltip text={ __( 'Reset Values', 'astra-builder' ) }>
					<Button
						className="reset ahfb-reset"
						disabled={ ( this.state.value === this.defaultValue ) }
						onClick={ () => {
							let value = this.defaultValue;
							this.setState( { value: this.defaultValue } );
							this.updateValues( value );
						} }
					>
						<Dashicon icon='image-rotate' />
					</Button>
				</Tooltip>
				{ this.props.control.params.label &&
					this.props.control.params.label
				}
			</Fragment>
		);
		return (
			<div className={ `ahfb-control-field ahfb-icon-set-control${ this.controlParams.class ? ' ' + this.controlParams.class : '' }` }>
				{ this.controlParams.responsive && (
					<ResponsiveControl
						onChange={ ( currentDevice) => this.setState( { currentDevice } ) }
						controlLabel={ responsiveControlLabel }
					>
						<ButtonGroup className="ahfb-radio-container-control">
							{ Object.keys( this.controlParams.layout ).map( ( item ) => {
								return (
									<Fragment>
										{ this.controlParams.layout[ item ].tooltip && (
											<Tooltip text={ this.controlParams.layout[ item ].tooltip }>
												<Button
													isTertiary
													className={ ( item === this.state.value[this.state.currentDevice] ?
															'active-radio ' :
															'' ) + 'kt-ratio-' + item + ( this.controlParams.layout[ item ].icon && this.controlParams.layout[ item ].name ? ' btn-flex-col' : '' ) }
													onClick={ () => {
														let value = this.state.value;
														value[ this.state.currentDevice ] = item;
														this.setState( value );
														this.updateValues( value );
													} }
												>
													{ this.controlParams.layout[ item ].icon && (
														<span className="ahfb-icon-set">
															{ Icons[ this.controlParams.layout[ item ].icon ] }
														</span>
													) }
													{ this.controlParams.layout[ item ].dashicon && (
														<span className="ahfb-icon-set ahfb-set-dashicon">
															<Dashicon icon={ this.controlParams.layout[ item ].dashicon } />
														</span>
													) }
													{ this.controlParams.layout[ item ].name && (
														this.controlParams.layout[ item ].name
													) }
												</Button>
											</Tooltip>
										) }
										{ ! this.controlParams.layout[ item ].tooltip && (
											<Button
													isTertiary
													className={ ( item === this.state.value[this.state.currentDevice] ?
															'active-radio ' :
															'' ) + 'ast-radio-img-svg ast-radio-' + item + ( this.controlParams.layout[ item ].icon && this.controlParams.layout[ item ].name ? ' btn-flex-col' : '' ) }
															onClick={ () => {
																let value = this.state.value;
																value[ this.state.currentDevice ] = item;
																this.setState( value );
																this.updateValues( value );
															} }
											>
												{ this.controlParams.layout[ item ].icon && (
														<span className="ahfb-icon-set">
															{ Icons[ this.controlParams.layout[ item ].icon ] }
														</span>
													) }
													{ this.controlParams.layout[ item ].dashicon && (
														<span className="ahfb-icon-set ahfb-set-dashicon">
															<Dashicon icon={ this.controlParams.layout[ item ].dashicon } />
														</span>
													) }
													{ this.controlParams.layout[ item ].name && (
															this.controlParams.layout[ item ].name
													) }
											</Button>
										) }
									</Fragment>
								);
							} )}
						</ButtonGroup>
					</ResponsiveControl>
				) }
				{ ! this.controlParams.responsive && (
					<Fragment>
						<div className="ahfb-responsive-control-bar">
							<span className="customize-control-title">{ controlLabel }</span>
						</div>
						<ButtonGroup className="ahfb-radio-container-control">
							{ Object.keys( this.controlParams.layout ).map( ( item ) => {
								return (
									<Fragment>
										{ this.controlParams.layout[ item ].tooltip && (
											<Tooltip text={ this.controlParams.layout[ item ].tooltip }>
												<Button
													isTertiary
													className={ ( item === this.state.value ?
															'active-radio ' :
															'' ) + 'ast-radio-img-svg ast-radio-' + item + ( this.controlParams.layout[ item ].icon && this.controlParams.layout[ item ].name ? ' btn-flex-col' : '' ) }
													onClick={ () => {
														let value = this.state.value;
														value = item;
														this.setState( { value: item });
														this.updateValues( value );
													} }
												>
													{ this.controlParams.layout[ item ].icon && (
														<span className="ahfb-icon-set">
															{ Icons[ this.controlParams.layout[ item ].icon ] }
														</span>
													) }
													{ this.controlParams.layout[ item ].name && (
															this.controlParams.layout[ item ].name
													) }
												</Button>
											</Tooltip>
										) }
										{ ! this.controlParams.layout[ item ].tooltip && (
											<Button
													isTertiary
													className={ ( item === this.state.value ?
															'active-radio ' :
															'' ) + 'ast-radio-img-svg ast-radio-' + item + ( this.controlParams.layout[ item ].icon && this.controlParams.layout[ item ].name ? ' btn-flex-col' : '' ) }
															onClick={ () => {
																let value = this.state.value;
																value = item;
																this.setState( { value: item });
																this.updateValues( value );
															} }
											>
												{ this.controlParams.layout[ item ].icon && (
														<span className="ahfb-icon-set">
															{ Icons[ this.controlParams.layout[ item ].icon ] }
														</span>
													) }
													{ this.controlParams.layout[ item ].name && (
															this.controlParams.layout[ item ].name
													) }
											</Button>
										) }
									</Fragment>
								);
							} )}
						</ButtonGroup>
					</Fragment>
				) }
			</div>
		);
	}

	updateValues( value ) {

		if ( this.controlParams.responsive ) {
			this.props.control.setting.set( {
			...this.props.control.setting.get(),
			...value,
			flag: !this.props.control.setting.get().flag
		} );
		} else {
			this.props.control.setting.set( value );
		}
	}
}

IconSetComponent.propTypes = {
	control: PropTypes.object.isRequired
};

export default IconSetComponent;
