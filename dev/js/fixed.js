/**
 * Description - Uses jQuery to make IPS 4's default theme's navbar fixed when you scroll down past the header on the page. Using for The Modding Community!
 * Author - Christian Deacon (@gamemann)
 * Open Source - https://github.com/modcommunity/Web-Open-Source
 * 
 * 
 * The Modding Community
 * Taking Modding To The Next Level!
 * ModdingCommunity.com 
**/



;(function($, _, undefined)
{
	"use strict";

	ips.controller.register('plugins.fixednavbar', 
    {
		initialize: function () 
        {
            console.log("WHYYYYYYYYYYYYYYYY");
            // Scroll and reszie events.
            this.on(document, 'scroll', _, this.scroller);
			this.on(document, 'resize', _, this.resize);

            // Define things within the controller here.
            this.fix_class = "navbar-fixed";
            this.unfix_class = "navbar-unfixed";
            this.nav_addclass = "navbar";
            
            // Navbar(s) selection.
            var navbar_sel = "#ipsLayout_header nav";
            
            // Retrieve elements we need to change for The Modding Community's website.
            this.navbars = $(navbar_sel);
            
            // Always do error checks :)
            if (!this.navbars)
            {
                throw new Error("[TMC Fixed Navbar] Could not find IPS 4 navbars.");
            }
            
            // Header selection.
            var header_sel = "#ipsLayout_header header";
            
            // Icon image, class, or ID selector.
            var icon_sel = "#nav-icon-fixed";
            
            // IPS 4 header layout.
            this.header_layout = $("#ipsLayout_header");
            
            // If an icon image exist, enablethat.
            this.icon = $(icon_sel);
            
            // For header height calculation.
            this.header = $(header_sel);
            
            this.header_height;
            
            if (this.header)
            {
                this.header_height = this.header.height();
            }
            
            if (this.header_height < 1)
            {
                // Header height in pixels.
                this.header_height = 80;
            }
            
            // Navbar max height in pixels.
            this.navbar_maxheight = this.navbars.first().height();
            
            if (this.navbar_maxheight < 1)
            {
                this.navbar_maxheight = 52;
            }

            // Fixed transparently.
            this.unfixed_opacity = 0.7;
            this.fixed_opacity = 1.0;
            
            // Check to see if we should just add a custom class to the navbar.
            if (this.nav_addclass.length > 0)
            {
                this.navbars.addClass(this.nav_addclass);
            }
            else
            {
                // Set general navbar settings for fixed support.
                this.navbars.css('z-index', '100');
                this.navbars.css('width', '100%');
                this.navbars.css('top', '0px');
                this.navbars.css('left', '0px');
            }

            this.navbars.css('max-height', this.navbar_maxheight);
            
            // Fixed toggle variable.
            this.fixed = false;
		},

        scroller: function (e) 
        {
            // If the navbar is hidden, return so it doesn't impact mobile devices.
            if (this.navbars.first().is(":hidden"))
            {
                // If our margin (bottom) is more than 0px, this indicates a user went from desktop to mobile theme. So set back margin bottom.
                var margin = this.header_layout.css('margin-bottom');

                if (margin && parseInt(margin) > 0)
                {
                    this.header_layout.css('margin-bottom', '0px');
                }

                return;
            }

            // Retrieve current Y position.
            var pos = window.scrollY;

            // Check if we're under the header or not.
            if (pos > this.header_height && !this.fixed)
            {
                if (this.fix_class.length < 1)
                {
                    navbars.css('background', 'rgba(var(--theme-main_nav), ' + this.fixed_opacity + ')');
                    this.navbars.css('position', 'fixed');
                }
                else
                {
                    this.navbars.addClass(this.fix_class);
                    this.navbars.removeClass(this.unfix_class);
                }

                if (this.icon)
                {
                    this.icon.css('visibility', 'visible');
                }

                if (this.header_layout)
                {
                    this.header_layout.css('margin-bottom', this.navbar_maxheight * 2); // We times it by two to include the second navbar.
                }

                this.fixed = true;
            } else if (pos <= this.header_height && this.fixed)
            {
                // Revert back to non-fixed navbar.
                if (this.unfix_class.length < 1)
                {
                    navbars.css('background', 'rgba(var(--theme-main_nav), ' + this.unfixed_opacity + ')');
                    this.navbars.css('position', 'relative');
                }
                else
                {
                    this.navbars.addClass(this.unfix_class);
                    this.navbars.removeClass(this.fix_class);
                }

                if (this.icon)
                {
                    this.icon.css('visibility', 'hidden');
                }

                if (this.header_layout)
                {
                    this.header_layout.css('margin-bottom', '0px');
                }

                this.fixed = false;
            }
        },

        resize: function(e) 
        {
            if (this.navbars.first().is(":visible"))
            {
                return;
            }
        
            // If our margin (bottom) is more than 0px, this indicates a user went from desktop to mobile theme. So set back margin bottom.
            var margin = this.header_layout.css('margin-bottom');
        
            if (margin && parseInt(margin) > 0)
            {
                this.header_layout.css('margin-bottom', '0px');
            }
        }
    });
}(jQuery, _));