var customer_option = function () {
    this.option = {};
    this.edit_data = {};
}
customer_option.prototype = {
    customer_search: function (StrType) {
        var This = this;
        var strtype = StrType;
        $("#search_customer").click(function () {
            //加载层
            var resid = $("#body").attr("resid");
            This.show_customer(1, Sys_PageSize, true, resid, false);
        });
        //键盘enter事件																		
        $("input,select,#search_customer").keydown(function (e) {
            if (e.keyCode == 13) {
                var resid = $("#body").attr("resid");
                This.show_customer(1, Sys_PageSize, true, resid, false);
            }
        });
        
        //回访
        $(document).on("click", ".Detail", function () {
            var name = $(this).parent().parent().find("td").eq(1).text();
            var _id = $(this).parent().attr("tid");
            layer.open({
                title: name + '-详情',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['900px', '550px'],
                fix: false, //不固定
                maxmin: true,
                content: '/CBCustomer/Detail?id=' + _id
            });
        });
       
        //页码的事件
        $(document).on("click", "#Pagination a[class='page']", function () {
            var page = $(this).attr("page");				//当前页
            var resid = $("#body").attr("resid");
            This.show_customer(page, Sys_PageSize, true, resid, false);
        });
        //点击页码跳转
        $(document).on("click", "#Pagination a[class='pageurl']", function () {
            if ($("#txtpage").val() > 0) {
                var page = $("#txtpage").val();				//当前页
                var resid = $("#body").attr("resid");
                This.show_customer(page, Sys_PageSize, true, resid, false);
            }
        });
        //全选复选框
        $("#list_checkbox_all").click(function () {
            $("input[name='list_checkbox']").attr("checked", $("#list_checkbox_all").is(":checked"));
        });
        This.changState(false);
    },
    changState: function (ispostback) {
        var This = this;
        if (!ispostback) {
            $("#list tr").each(function () {
                var state = $(this).find("td").eq(11).attr("state");
                if (state != 1) {
                    $(this).find("td").eq(11).find(".Pause").text("[开启]");
                    $(this).find("td").eq(11).find(".Pause").attr("class", "On");
                }
            })
        }
        else {
            parent.$("#list tr").each(function () {
                var state = $(this).find("td").eq(11).attr("state");
                if (state != 1) {
                    $(this).find("td").eq(11).find(".Pause").text("[开启]");
                    $(this).find("td").eq(11).find(".Pause").attr("class", "On");
                }
            })
        }
    },

    get_option_search: function (ispostback) {
        var This = this;
        if (!ispostback) {
            This.option = {
                name: $("#name").val(),
                ispostback: true
            };
        }
        else {
            This.option = {
                name: parent.$("#name").val(),
                ispostback: true
            };
        }
    },
    show_customer: function (pagescurrent, pagesize, async_flag, resid, ispostback) {
        var This = this;
        if (!ispostback) {
            $("#list").empty();
            $("#Pagination").empty();
        }
        else {
            parent.$("#list").empty();
            parent.$("#Pagination").empty();
        }
        This.get_option_search(ispostback);
        Sys_PageSize = pagesize;
        var option = $.extend(This.option, { PageIndex: pagescurrent, PageSize: Sys_PageSize });
        layer.load();
        $.ajax({
            url: "/CBCustomer/Index",
            dataType: "json",
            contentType: 'application/json',
            type: "POST",
            async: async_flag,
            data: stringify({ resid: resid, info: option }),
            success: function (data) {
                //关闭loading对话框
                layer.closeAll('loading');
                if (data.success == true) {
                    // 刷新页面
                    if (!ispostback) {
                        $("#list").append(data.strHtml);
                        $("#Pagination").append(data.strPage);
                        This.changState(ispostback);
                    }
                    else {
                        parent.$("#list").append(data.strHtml);
                        parent.$("#Pagination").append(data.strPage);
                        This.changState(ispostback);
                        var index = parent.layer.getFrameIndex(window.name); //获取窗口索
                        parent.layer.close(index);
                    }
                }
                else if (data.error == 2) {
                    layerMsgCall("登录已过期请您重新登录", function () {
                        parent.window.location.href = "/Home/OutLogin";
                    })
                }
                else {
                    layerMsg("数据库请求失败");
                }
            },
            error: function (request, status, errorThrown) {
                layerMsg("Ajax请求失败");
            }
        });
    },
    //编辑添加
    show_edit_add: function () {
        var This = this;
        Sys_PageSize = 20;
        var resid = parent.$("#body").attr("resid");

    },
    check_data: function (type) {
        var This = this;
        This.edit_data.id = $("#id").val();
        //楼盘
        This.edit_data.name = $("#name").val();
        This.edit_data.mobile = $("#mobile").val();
        This.edit_data.other = $("#other").val();
        This.edit_data.loupanname = $("#loupanname").val();
        This.edit_data.sex = $("#sex").val();
        This.edit_data.level = $("#level").val();
        //This.edit_data.loupanname = $("#selLouPan").find("option:selected").text();
        This.edit_data.minprice = $("#minprice").val();
        This.edit_data.maxprice = $("#maxprice").val();
        This.edit_data.huxingtype = $("#huxingtype").val();
        This.edit_data.zhiyeguwen = $("#zhiyeguwen").val();
        This.edit_data.createid = $("#createid").val();
        return true;
    },
}