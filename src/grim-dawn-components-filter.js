'use strict;';
var app = angular.module('gdcf', []);

app.filter('filterComponents', function () {
    return function (items, tier, name, used_with, stats) {
        var splitArgs = function (args) {
            return args.split(";").map(function (e) { return e.trim(); }).filter(function (e) { return e !== ""; });
        };

        var validateArgs = function (args, target) {
            var r = false;

            args.forEach(function (e) {
                r |= target.toUpperCase().includes(e.toUpperCase());
            });

            return r;
        };

        return items.filter(function (item) {
            var filter_by_tier = tier === "" || tier === "any" || item.cmp_tier === tier;

            var filter_by_name = name === "",
                ns = splitArgs(name);

            filter_by_name |= validateArgs(ns, item.cmp_name);

            var filter_by_used_with = used_with === "",
                us = splitArgs(used_with);

            item.cmp_used_with.forEach(function (e) {
                filter_by_used_with |= validateArgs(us, e);    
            });

            var filter_by_stats = stats === "",
                ss = splitArgs(stats);

            item.cmp_stats.forEach(function (e) {
                filter_by_stats |= validateArgs(ss, e);
            })
            
            return filter_by_tier 
                && filter_by_name
                && filter_by_used_with
                && filter_by_stats;
        });
    };
});

app.controller('gdcfCtrl', function($scope) {
    $scope.components = components;
    $scope.tier = "";
    $scope.name = "";
    $scope.used_with = "";
    $scope.stats = "";

    $scope.reset = function () {
        $scope.tier = "";
        $scope.name = "";
        $scope.used_with = "";
        $scope.stats = "";    
    }
});

