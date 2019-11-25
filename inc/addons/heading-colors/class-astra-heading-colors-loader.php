<?php
/**
 * Heading Colors Loader for Astra theme.
 *
 * @package     Astra
 * @author      Brainstorm Force
 * @copyright   Copyright (c) 2019, Brainstorm Force
 * @link        https://www.brainstormforce.com
 * @since       Astra x.x.x
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'Astra_Heading_Colors_Loader' ) ) {

	/**
	 * Customizer Initialization
	 *
	 * @since x.x.x
	 */
	class Astra_Heading_Colors_Loader {

		/**
		 *  Constructor
		 */
		public function __construct() {

			add_filter( 'astra_theme_defaults', array( $this, 'theme_defaults' ) );
			add_action( 'customize_register', array( $this, 'customize_register' ), 2 );
			add_action( 'customize_preview_init', array( $this, 'preview_scripts' ), 110 );
			// Load Google fonts.
			add_action( 'astra_get_fonts', array( $this, 'add_fonts' ), 1 );
		}

		/**
		 * Enqueue google fonts.
		 *
		 * @return void
		 */
		public function add_fonts() {

			$font_family_h1 = astra_get_option( 'font-family-h1' );
			$font_weight_h1 = astra_get_option( 'font-weight-h1' );
			Astra_Fonts::add_font( $font_family_h1, $font_weight_h1 );

			$font_family_h2 = astra_get_option( 'font-family-h2' );
			$font_weight_h2 = astra_get_option( 'font-weight-h2' );
			Astra_Fonts::add_font( $font_family_h2, $font_weight_h2 );

			$font_family_h3 = astra_get_option( 'font-family-h3' );
			$font_weight_h3 = astra_get_option( 'font-weight-h3' );
			Astra_Fonts::add_font( $font_family_h3, $font_weight_h3 );

			$theme_btn_font_family = astra_get_option( 'font-family-button' );
			$theme_btn_font_weight = astra_get_option( 'font-weight-button' );
			Astra_Fonts::add_font( $theme_btn_font_family, $theme_btn_font_weight );
		}

		/**
		 * Set Options Default Values
		 *
		 * @param  array $defaults  Astra options default value array.
		 * @return array
		 *
		 * @since x.x.x
		 */
		function theme_defaults( $defaults ) {

			/**
			* Heading Tags <h1> to <h6>
			*/
			$defaults['h1-color'] = '';
			$defaults['h2-color'] = '';
			$defaults['h3-color'] = '';
			$defaults['h4-color'] = '';
			$defaults['h5-color'] = '';
			$defaults['h6-color'] = '';

			// Header <H1>.
			$defaults['font-family-h1']    = 'inherit';
			$defaults['font-weight-h1']    = 'inherit';
			$defaults['text-transform-h1'] = '';
			$defaults['line-height-h1']    = '';

			// Header <H2>.
			$defaults['font-family-h2']    = 'inherit';
			$defaults['font-weight-h2']    = 'inherit';
			$defaults['text-transform-h2'] = '';
			$defaults['line-height-h2']    = '';

			// Header <H3>.
			$defaults['font-family-h3']    = 'inherit';
			$defaults['font-weight-h3']    = 'inherit';
			$defaults['text-transform-h3'] = '';
			$defaults['line-height-h3']    = '';

			/**
			 * Theme button Font Defaults
			 */
			$defaults['font-weight-button']    = 'inherit';
			$defaults['font-family-button']    = 'inherit';
			$defaults['text-transform-button'] = '';
			$defaults['theme-btn-line-height'] = '';

			return $defaults;
		}

		/**
		 * Load color configs for the Heading Colors.
		 *
		 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
		 *
		 * @since x.x.x
		 */
		function customize_register( $wp_customize ) {

			/**
			 * Register Panel & Sections
			 */
			require_once ASTRA_THEME_HEADING_COLORS_DIR . 'customizer/class-astra-heading-colors-configs.php';
		}

		/**
		 * Customizer Preview
		 */
		function preview_scripts() {
			/**
			 * Load unminified if SCRIPT_DEBUG is true.
			 */
			/* Directory and Extension */
			$dir_name    = ( SCRIPT_DEBUG ) ? 'unminified' : 'minified';
			$file_prefix = ( SCRIPT_DEBUG ) ? '' : '.min';
			wp_enqueue_script( 'astra-heading-colors-customizer-preview-js', ASTRA_THEME_HEADING_COLORS_URI . 'assets/js/' . $dir_name . '/customizer-preview' . $file_prefix . '.js', array( 'customize-preview', 'astra-customizer-preview-js' ), ASTRA_THEME_VERSION, true );
		}
	}
}

/**
*  Kicking this off by creating the object of the class.
*/
new Astra_Heading_Colors_Loader();