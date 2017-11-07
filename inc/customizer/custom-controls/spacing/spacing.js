/**
 * File spacing.js
 *
 * Handles the spacing
 *
 * @package Astra
 */

	wp.customize.controlConstructor['ast-spacing'] = wp.customize.Control.extend({

		ready: function() {

			'use strict';

			var control = this,
		    value;
		    control.astResponsiveInit();

			// Set the spacing container.
			// this.container = control.container.find( 'ul.ast-spacing-wrapper' ).first();

			// Save the value.
			this.container.on( 'change keyup paste', 'input.ast-spacing-input', function() {

				value = jQuery( this ).val();

				// Update value on change.
				control.updateValue();
			});

			/**
			 * Refresh preview frame on blur
			 */
			var desktopInput = [],
				tabletInput = [],
				mobileInput = [];

			this.container.on( 'blur', 'input.ast-spacing-desktop' ).each( function() {
				var value = jQuery(this).val();
				if (value) {
					desktopInput.push(value);
				}
			});

			this.container.on( 'blur', 'input.ast-spacing-tablet' ).each( function() {

				var value = jQuery(this).val();
				if (value) {
					tabletInput.push(value);
				}

			});

			this.container.on( 'blur', 'input.ast-spacing-mobile' ).each( function() {

				var value = jQuery(this).val();
				if (value) {
					mobileInput.push(value);
				}

			});

			if ( desktopInput.length === 0 || tabletInput.length === 0 || mobileInput.length === 0 ) {
			    wp.customize.previewer.refresh();
			}

		},

		/**
		 * Updates the spacing values
		 */
		updateValue: function() {

			'use strict';

			var control = this,
				newValue = {
					'desktop' : {},
					'tablet' : {},
					'mobile' : {}
				};

			this.container.find( 'input.ast-spacing-desktop' ).each( function() {
				var spacing_input = jQuery( this ),
				item = spacing_input.data( 'id' ),
				item_value = spacing_input.val();

				newValue['desktop'][item] = item_value;
			});

			this.container.find( 'input.ast-spacing-tablet' ).each( function() {
				var spacing_input = jQuery( this ),
				item = spacing_input.data( 'id' ),
				item_value = spacing_input.val();

				newValue['tablet'][item] = item_value;
			});

			this.container.find( 'input.ast-spacing-mobile' ).each( function() {
				var spacing_input = jQuery( this ),
				item = spacing_input.data( 'id' ),
				item_value = spacing_input.val();

				newValue['mobile'][item] = item_value;
			});

			control.setting.set( newValue );
		},

		/**
		 * Set the responsive devices fields
		 */
		astResponsiveInit : function() {
			
			'use strict';
			this.container.find( '.ast-spacing-responsive-btns button' ).on( 'click', function( event ) {

				var device = jQuery(this).attr('data-device');
				if( 'desktop' == device ) {
					device = 'tablet';
				} else if( 'tablet' == device ) {
					device = 'mobile';
				} else {
					device = 'desktop';
				}

				jQuery( '.wp-full-overlay-footer .devices button[data-device="' + device + '"]' ).trigger( 'click' );
			});
		},
	});

	jQuery( document ).ready( function( ) {

		// Connected button
		jQuery( '.ast-spacing-connected' ).on( 'click', function() {

			// Remove connected class
			jQuery(this).parent().parent( '.ast-spacing-wrapper' ).find( 'input' ).removeClass( 'connected' ).attr( 'data-element-connect', '' );
			
			// Remove class
			jQuery(this).parent( '.ast-spacing-input-item-link' ).removeClass( 'disconnected' );

		} );

		// Disconnected button
		jQuery( '.ast-spacing-disconnected' ).on( 'click', function() {

			// Set up variables
			var elements 	= jQuery(this).data( 'element-connect' );
			
			// Add connected class
			jQuery(this).parent().parent( '.ast-spacing-wrapper' ).find( 'input' ).addClass( 'connected' ).attr( 'data-element-connect', elements );
			
			// Add class
			jQuery(this).parent( '.ast-spacing-input-item-link' ).addClass( 'disconnected' );

		} );

		// Values connected inputs
		jQuery( '.ast-spacing-input-item' ).on( 'input', '.connected', function() {

			var dataElement 	  = jQuery(this).attr( 'data-element-connect' ),
				currentFieldValue = jQuery( this ).val();

			jQuery( '.connected[ data-element-connect="' + dataElement + '" ]' ).each( function( key, value ) {
				jQuery(this).val( currentFieldValue ).change();
			} );

		} );
	});

	jQuery(' .wp-full-overlay-footer .devices button ').on('click', function() {

		var device = jQuery(this).attr('data-device');
		jQuery( '.customize-control-ast-spacing .input-wrapper .ast-spacing-wrapper, .customize-control .ast-spacing-responsive-btns > li' ).removeClass( 'active' );
		jQuery( '.customize-control-ast-spacing .input-wrapper .ast-spacing-wrapper.' + device + ', .customize-control .ast-spacing-responsive-btns > li.' + device ).addClass( 'active' );
	});
