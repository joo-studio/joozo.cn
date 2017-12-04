
var w = "";
var h = "";
$(function () {
    w = $(document).width();
    h = $(document).height();

    $(document).on("click", ".guide_btn a", function () {
        var atvtype = "";
        var type = $(this).attr("data-type");
        if (type == "1") {
            atvtype = "刮奖";
        }
        else if (type == "2") {
            atvtype = "玩大转盘";
        }
        CheckMobile(atvtype);
    })
})

function CheckMobile(name) {
    var html = '<div id="lgcover" style="position: fixed; top: 0px;left:0px; overflow: hidden; display: none;background: rgba(33, 33, 33, 0.7) none repeat scroll 0% 0%; z-index: 999;"><div style="background: rgb(255, 255, 255) none repeat scroll 0% 0%; color: rgb(153, 153, 153);margin: 100px auto; padding: 20px; width: 230px;" class="ui-body-a ui-overlay-shadow ui-corner-all"  id="givepointd"><table cellpadding="3" style="margin: 0px auto;"> <tbody><tr><td style="font-size: 14px; color: #fe0000; text-align: center; padding-bottom: 12px;" >输入手机号码后才能' + name + '</td> </tr> <tr> <td style="padding-bottom: 8px"> <div style="border: #ddd solid 1px;" class="ui-input-text ui-body-inherit ui-corner-all"> <input type="text" value="" style="padding: 10px 0 10px 2px" placeholder="手机号码" name="mobile" id="mobile"></div> </td> </tr> <tr> <td> <a data-transition="flow" class="ui-corner-all ui-btn action-cookie ui-btn-b ui-btn-shadow" href="javascript:;">开始' + name + '</a> </td></tr> <tr> </tr> </tbody> </table> </div> </div>';
    $("body").append(html);
    var container = $("#lgcover");
    container.css({ "width": w, "height": h }).show().on("click", ".action-hide", function () {
        container.remove();
    });
    container.on("click", ".action-cookie", function () {
        var mobile = $("#mobile").val();
        if (mobile == "") {
            alert("请输入您的手机号码");
            return;
        }
        $.ajax({
            url: '/game/activity.ashx',
            type: 'GET',
            data: { action: "cookieMobile", mobile: mobile, id: $("#id").val() },
            success: function (result) {
                if (result.OK) {
                    window.location.href = window.location.href;
                }
                else {
                    alert(result.Message);
                }
            }
        });
    })
}

function GetAlert(actorID, result) {
    var html = '<div id="tipmsg">';
    html += '<div class="tipcon">';
    html += '<i></i>';
    html += '<div class="con-d">';
    if (actorID > 0) {
        html += '<h3>';
        html += '恭喜您：</h3>';
        html += '<p>';
        html += '获取<span>' + result.Message.Actor.PrizeName + '：' + result.Message.Actor.Award + '</span></p>';

        if ($.trim($("#Explain").html()) != "") {
            html += '<div class="con">';
            html += $("#Explain").html();
            html += '</div>';
        }

        html += '<p class="lock"></p>';

    }
    else {
        html += '<h3>';
        html += '亲：</h3>';
        html += '<p>';
        html += '您未获得奖励，请再接再厉!</p>';
        if ($.trim($("#Explain").html()) != "") {
            html += '<div class="con">';
            html += $("#Explain").html();
            html += '</div>';
        }
        html += '<p class="lock"></p>';
    }
    html += '<div class="d-btn">';
    html += '<a href="javascript:;" class="share" data-share-text="' + $("#ActivityName").val() + '" data-share-pic="' + $("#CoverPath").val() + '">立即分享</a><a href="javascript:;" class="luckdraw">继续抽奖</a>';
    html += '</div>';
    html += '<div>';
    html += '</div>';
    $("body").append(html);
    var containerA = $("#tipmsg");
    containerA.css({ "width": w, "height": h }).show().on("click", "i", function () {
        containerA.remove();
    }).on("click", ".luckdraw", function () {
        csh(actorID, result);
        containerA.remove();
    }).on("click", ".share", function () {
        shareShow(this);
    });

    setTimeout(function () {
        luckhide();
    }, 500);

}
function shareShow(obj) {
    var msg_dom = "";
    msg_dom += '<div id="bshare_bottom">';
    if (is_weixin() === true) {
        msg_dom += '<div class="fxbjimg" id="fxbjimg">';
        msg_dom += '<img src="/game/img/IMG_0201.PNG" />';
        msg_dom += '</div>';
    }
    else {
        msg_dom += '<div class="bshare">';
        msg_dom += '<a href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=' + $(obj).attr('data-share-text') + '&url=' + encodeURIComponent(location.href) + '&pic=' + $(obj).attr('data-share-pic') + '">QQ空间</a>';
        msg_dom += '<a href="http://share.v.t.qq.com/index.php?c=share&a=index&title=' + $(obj).attr('data-share-text') + '&url=' + encodeURIComponent(location.href) + '&pic=' + $(obj).attr('data-share-pic') + '">腾讯微博</a>';
        msg_dom += '<a href="http://service.weibo.com/share/share.php?title=' + $(obj).attr('data-share-text') + '&url=' + encodeURIComponent(location.href) + '&pic=' + $(obj).attr('data-share-pic') + '">新浪微博</a>';
        msg_dom += '<a href="javascript:void(0)" class="bshare_qx">取消</a>';
        msg_dom += '</div>';
    }
    msg_dom += '</div>';
    $("body").append(msg_dom);

    var containerB = $("#bshare_bottom");
    containerB.css({ "width": w, "height": h }).show().on("click", ".bshare_qx,.fxbjimg", function () {
        containerB.remove();
    });
}
function is_weixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (is_mobile() && ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

function is_mobile() {
    if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i))) {
        if ((navigator.platform.indexOf("Win") == 0) || (navigator.platform.indexOf("Mac") == 0)) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}