"use strict";

(function() {

    var pastError = false;

    // Place the authentications here
    var auth1 = ["public key", "secret key",
        "public token", "secret key"
    ];
    var auth2 = ["public key", "secret key",
        "public token", "secret key"
    ];

    var update = function() {

        var cb = new Codebird;

        cb.setConsumerKey(auth1[0], auth1[1]);
        cb.setToken(auth1[2], auth1[3]);

        var twitter = document.getElementById("twitter");

        var imgTweet = (function() {
            switch (Math.floor(Math.random() * 5)) {
                case 0:
                    return "archillect";
                    break;
                case 1:
                    return "generativebot";
                    break;
                case 2:
                    return "pixelsorter";
                    break;
                case 3:
                    return "MuseumBot";
                    break;
                default:
                    return "dscovr_epic";
            }
        })();

        var quoteTweet = (function() {
            switch (Math.floor(Math.random() * 8)) {
                case 0:
                    return "poem_exe";
                    break;
                case 1:
                    return "censusAmericans";
                    break;
                case 2:
                    return "MagicRealismBot";
                    break;
                case 3:
                    return "everyailment";
                    break;
                case 4:
                    return "thesefutures";
                    break;
                case 5:
                    return "fuckeveryword";
                    break;
                case 6:
                    return "portmanteau_bot";
                    break;
                default:
                    return "metaprophet";
            }
        })();;

        cb.__call(
            "statuses/userTimeline", {
                screen_name: imgTweet,
                count: 1,
            },
            function(replies, rate, err) {
                if (err || replies.errors) {
                    console.error(err);
                    console.error(rate);
                    console.error(replies);
                    if (pastError && replies.errors) {
                        alert(replies.errors[0].message);
                    }
                    pastError = true;
                    return;
                }
                var reply = replies[0],
                    media = reply.extended_entities.media[0],
                    videoInfo = media.video_info;

                var child;
                var backChild;

                if (videoInfo) {
                    console.log(videoInfo.variants[0].url);
                    child = document.createElement("video");
                    child.src = videoInfo.variants[0].url;
                    child.autoplay = true;
                    child.loop = true;
                    child.id = "foreground-image";

                    backChild = document.createElement("video");
                    backChild.src = videoInfo.variants[0].url;
                    backChild.autoplay = true;
                    backChild.loop = true;
                    backChild.id = "background-image";

                    //var backgroundImage = document.getElementById("background-container");
                    //backgroundImage.nodeValue = "";
                    //backgroundImage.appendChild(backChild);
                } else {
                    console.log(media.media_url);

                    child = new Image();
                    child.src = media.media_url;
                    child.id = "foreground-image";

                    backChild = new Image();
                    backChild.src = media.media_url;
                    backChild.id = "background-image";

                    //document.getElementById("background-image").style.background = "url('" + child.src + "')";
                    //document.getElementById("background-image").nodeValue = "";
                    //document.getElementById("background-image").appendChild(backChild);
                }

                var backgroundImage = document.getElementById("background-container");
                backgroundImage.nodeValue = "";
                backgroundImage.appendChild(backChild);

                var foregroundImage = document.getElementById("foreground-container");
                foregroundImage.nodeValue = "";
                foregroundImage.appendChild(child);

                twitter.innerHTML += reply.source;

                var imgLink = twitter.lastElementChild;
                imgLink.className = "share";
                imgLink.innerHTML = imgTweet.charAt(0);
            }
        );

        cb.setConsumerKey(auth2[0], auth2[1]);
        cb.setToken(auth2[2], auth2[3]);

        cb.__call(
            "statuses/userTimeline", {
                screen_name: quoteTweet,
                count: 1,
            },
            function(replies, rate, err) {
                if (err || replies.errors) {
                    console.error(err);
                    console.error(rate);
                    console.error(replies);
                    if (pastError && replies.errors) {
                        alert(replies.errors[0].message);
                    }
                    pastError = true;
                    return;
                }
                var reply = replies[0];

                var q = document.getElementsByTagName("q")[0];
                q.innerHTML = reply.text + " -<cite>" + reply.source + "</cite>";

                twitter.innerHTML += reply.source;

                var quoteLink = twitter.lastElementChild;
                quoteLink.className = "share";
                quoteLink.innerHTML = quoteTweet.charAt(0);
            }
        );
    };

    update();

})();
