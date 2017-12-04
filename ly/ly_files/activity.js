var tempHtml = '';
tempHtml += '    <div class="wintitle">';
tempHtml += '        <img class="ctl-bar" data-id="{0}" data-open="false" style="float: right; margin-right: 2px;"  src="img/01-1.jpg">获得{1}';
tempHtml += '    </div>';
tempHtml += '    <div style="display: none;" id="remark-wintitle-{0}">';
tempHtml += '        <div class="infotitle2">';
tempHtml += '            奖品：{2}';
tempHtml += '        </div>';
tempHtml += '        <div class="infotitle2">';
tempHtml += '            获奖时间：{4}';
tempHtml += '        </div>';
tempHtml += '    </div>';

$(document).on("click", ".ctl-bar", function () {
    var id = $(this).data("id");
    var open = $(this).data("open");
    if (open) {
        $(this).attr("src", "img/01-1.jpg");
        $(this).data("open", false);
        $("#remark-wintitle-" + id).hide()
    }
    else {
        $(this).attr("src", "img/02-1.jpg");
        $(this).data("open", true);
        $("#remark-wintitle-" + id).show();
    }
});

function refreshActorItem() {
    $.ajax({
        url: '/game/activity.ashx',
        type: 'GET',
        data: { action: "getMyActor", id: $("#id").val() },
        error: function () { alert("远程访问失败"); },
        success: function (result) {
            var html = "";
            $.each(result.Message, function () {
                html += replaceActorItem(this.ID, this.PrizeName, this.Award, this.SnCode, this.ActTime, this.Status);
            });
            $(".ctl-items").html(html);
        }
    });
}
function replaceActorItem(actorId, prizeName, award, sn, actTime, status) {
    var tmp = tempHtml.replace(/\{0\}/g, actorId);
    tmp = tmp.replace(/\{1\}/g, prizeName);
    tmp = tmp.replace(/\{2\}/g, award);
    tmp = tmp.replace(/\{3\}/g, sn);
    tmp = tmp.replace(/\{4\}/g, actTime);
    tmp = tmp.replace(/\{5\}/g, status);
    return tmp
}
function prependActorItem(actorId, prizeName, award, sn, actTime, status) {
    $(".ctl-items").prepend(replaceActorItem(actorId, prizeName, award, sn, actTime, status));
}