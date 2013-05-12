/*
 * File: app/view/MyContainer1.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.2.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Booking.view.MyContainer1', {
    extend: 'Ext.Container',
    alias: 'widget.MyContainer1',

    config: {
        itemId: 'MyContainer1',
        scrollable: {
            direction: 'horizontal',
            directionLock: true
        },
        items: [
            {
                xtype: 'draw',
                initialize: function() {
                    this.callParent();
                },
                itemId: 'inlineDraw1',
                style: 'background:#236B8E;',
                listeners: [
                    {
                        fn: function(element, eOpts) {
                            var w = 650 * Ext.getStore('MyStore').getCount(),
                                h = Ext.getBody().getSize().height,
                                dynText = '10:33 pm',
                                surface = this.getSurface('main'),
                                loc,
                                iter;

                            this.setSize(w,h);
                            surface.setSize(w,h);

                            //Line across screen
                            surface.add({
                                type: 'rect',
                                fill: '#87CEEB',
                                height : 20,
                                width: w,
                                x: 0,
                                y: 330
                            }).show(true);

                            surface.add({
                                type: 'text',
                                text: 'Meetings in Room A',
                                font: '32px Arial',
                                fill: '#FFF',
                                x: 70,
                                y: 50
                            }).show(true);

                            for (iter=0; iter<5; iter++) {
                                loc = 40 + iter*450;
                                //Rounded rectangles on top
                                surface.add({
                                    type: 'rect',
                                    fill: '#43aad5',
                                    height : 130,
                                    width: 300,
                                    radius: 10,
                                    x: loc,
                                    y: 140
                                }).show(true);
                            }

                            for (iter=0; iter<5; iter++) {
                                loc = 275 + iter*450;
                                //Rounded rectangles on bottom
                                surface.add({
                                    type: 'rect',
                                    fill: '#43aad5',
                                    height : 130,
                                    width: 300,
                                    radius: 10,
                                    x: loc,
                                    y: 410
                                }).show(true);
                            }

                            for (iter = 0; iter<5; iter++) {
                                loc = 190 + iter*450;
                                //Triangles on top
                                surface.add({
                                    type: 'path',
                                    path: 'M ' + loc + ' ' + 270 + ' ' +
                                    'l ' + 25 + ' ' + 0 + ' ' +
                                    'l ' + -12 + ' ' + 10 + 'z',
                                    fillStyle: '#43aad5'
                                }).show(true);
                            }

                            for (iter = 0; iter<5; iter++) {
                                loc = 435 + iter*450;
                                //Triangles on bottom
                                surface.add({
                                    type: 'path',
                                    path: 'M ' + loc + ' ' + 410 + ' ' +
                                    'l ' + -25 + ' ' + 0 + ' ' +
                                    'l ' + 12 + ' ' + -10 + 'z',
                                    fillStyle: '#43aad5'
                                }).show(true);
                            }

                            surface.add({
                                type: 'text',
                                text: dynText,
                                font: '18px Arial',
                                fill: '#FFF',
                                x: 170,
                                y: 380
                            }).show(true);
                        },
                        event: 'painted'
                    },
                    {
                        fn: function(element, eOpts) {
                            var w = 650 * Ext.getStore('MyStore').getCount(),
                                h = Ext.getBody().getSize().height,
                                surface = this.getSurface('main');

                            this.setSize(w,h);
                            surface.setSize(w,h);
                        },
                        event: 'resize'
                    }
                ]
            }
        ]
    }

});