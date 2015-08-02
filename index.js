/*
 * Happy Steam Scraper 0.1
 * Copyright (C) Eskild Hustvedt 2015
 *
 * This library is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this library.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

var httpreq = require('httpreq'),
    cheerio = require('cheerio');

module.exports = {
    gamesFromProfile: function (profile,cb)
    {
        var url = 'http://steamcommunity.com/id/'+profile+'/games/?tab=all';
        if (!/^\D+$/.test(profile))
        {
            url = 'http://steamcommunity.com/profiles/'+profile+'/games/?tab=all';
        }
        httpreq.get(url,function (err, res)
        {
            if(err)
            {
                cb(err,null);
                return;
            }
            var $          = cheerio.load(res.body),
                steamGames = null;
            $('script').each(function ()
            {
                if(/var rgGames/.test($(this).text()))
                {
                    var content = $(this).text().split(/\n/);
                    for(var entry of content)
                    {
                        if (/^\s+var rgGames = /.test(entry))
                        {
                            try
                            {
                                steamGames = JSON.parse(entry.replace(/^\s+var rgGames = /,'').replace(/;\s*$/,''));
                                return false;
                            }
                            catch(e)
                            {
                                cb('Failed to parse embedded JSON data: '+e.message,null);
                            }
                        }
                    }
                }
            });
            if(steamGames === null)
            {
                cb('Failed to locate JSON data',null);
                return;
            }
            cb(null,steamGames);
            return;
        });
    }
};
