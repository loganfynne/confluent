/*
 * File: app/view/authContainer.js
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

Ext.define('Conflux.view.authContainer', {
    extend: 'Ext.Container',

    config: {
        itemId: 'authContainer',
        listeners: [
            {
                fn: 'onContainerPainted',
                event: 'painted'
            }
        ]
    },

    onContainerPainted: function(element, eOpts) {
        console.log("Inside painted!");
        var parameters = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            parameters[key] = value;
        });

        function isEmpty(ob) {
            for(var i in ob){
                return false;
            }
            return true;
        }

        if (isEmpty(parameters)) {
            window.location.href = 'login.html';
        } else {
            Conflux.app.authToken = decodeURI(parameters.auth);
            this.generateItems();
        }
    },

    generateItems: function() {
        var me = this,
            token = Conflux.app.authToken,
            clientId = '464168127252.apps.googleusercontent.com',
            apiKey = 'AIzaSyAy7JAsd5JlzjTR_fkkarby9N1c3YkhY6o',
            scopes = 'https://www.googleapis.com/auth/calendar',
            final_i = 0,
            calendarIds = ['bestfitmedia.com_37353438383431323932@resource.calendar.google.com',
            'bestfitmedia.com_2d3439373239333732333934@resource.calendar.google.com',
            'bestfitmedia.com_2d3135393231303233373935@resource.calendar.google.com',
            'bestfitmedia.com_2d39383936323436392d393431@resource.calendar.google.com'],
            items = [],
            calendarId,
            iter = 0,
            summary,
            child,
            obj;

        Ext.create('Conflux.view.MyContainer1');
        Ext.create('Conflux.view.mainCarousel');

        try {
            gapi.client.setApiKey(apiKey);
            gapi.auth.setToken(token);
        } catch(e) {
            window.location.reload();
        }

        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, function(authResult) {
        if (authResult) {
            gapi.client.load('calendar', 'v3', function() {
                var request = gapi.client.calendar.calendarList.list();
                request.execute(function(outer) {
                    for (i = 0; i < outer.items.length; i++) {
                        if (outer.items[i].id.substring(0,8) === 'bestfitm') {
                            final_i++;
                        }
                    }
                    for (i = 0; i < outer.items.length; i++) {
                        if (outer.items[i].id === calendarIds[iter]) {
                            calendarId = outer.items[i].id;
                            summary = outer.items[i].summary;
                            console.log("ID: " + calendarId + " Summary: " + summary);
                            if (calendarId !== null && summary !== null) {
                                me.loadData(calendarId, summary, final_i, items);
                            }
                            iter++;
                        }
                    }
                });
            });
        }
    });
    },

    loadData: function(calendarId, summary, final_i, items) {
        var me = this,
            today = new Date(),
            mainCarousel,
            child;

        var token = Conflux.app.authToken,
            clientId = '464168127252.apps.googleusercontent.com',
            apiKey = 'AIzaSyAy7JAsd5JlzjTR_fkkarby9N1c3YkhY6o',
            scopes = 'https://www.googleapis.com/auth/calendar';

        var backgroundColors = [
        '#000',
        '#53ab73', //Green
        '#4E2B52', //Purple
        '#d27f56', //Orange
        '#0d6289', //Blue
        '#FF4242', //Red
        '#D9D1A9'  //Beige
        ];

        var boxColors = [
        '#000',
        '#7DCB99', //Green
        '#436085', //Purple
        '#F99665', //Orange
        '#43aad5', //Blue
        '#FF837E', //Red
        '#B9C18A'  //Beige
        ];

        var timelineColors = [
        '#000',
        '#80E2BF', //Green
        '#5A325F', //Purple
        '#DA8359', //Orange
        '#176c93', //Blue
        '#EC6B51', //Red
        '#A4AE6A'  //Beige
        ];

        today.setHours(0,0,0,0);
        today = today.toISOString();

        gapi.client.setApiKey(apiKey);
        gapi.auth.setToken(token);

        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
        function(authResult) {
            if (authResult) {
                gapi.client.load('calendar', 'v3', function() {
                    var request = gapi.client.calendar.events.list({
                        'calendarId': calendarId,
                        'singleEvents': true,
                        'orderBy': 'startTime',
                        'timeMin': today,
                        'maxResults': 50
                    });

                    request.execute(function(resp) {
                        try {
                            array_i = Ext.ComponentQuery.query('#inlineDraw1').length - 1;
                            obj = new Conflux.view.MyContainer1();
                            child = Ext.ComponentQuery.query('#inlineDraw1')[array_i];

                            child.roomText = summary;
                            child.backgroundColor = backgroundColors[array_i];
                            child.boxColor = boxColors[array_i];
                            child.timelineColor = timelineColors[array_i];
                            child.events = resp.items;
                            items.push(obj);

                            if (items.length == 4) {
                                mainCarousel = Ext.ComponentQuery.query('#mainCarousel')[0];
                                mainCarousel.removeAll(true);
                                mainCarousel.setItems(items);
                                Ext.Viewport.setActiveItem('mainCarousel');
                            }
                        } catch(e) {}
                        });
                    });
                } else {
                    window.location.reload();
                }
            });
    }

});