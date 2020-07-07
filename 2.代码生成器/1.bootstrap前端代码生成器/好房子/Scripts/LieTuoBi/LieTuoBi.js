var lietuobi_option = function () {
    this.option = {};
    this.edit_data = {};
}
lietuobi_option.prototype = {
    lietuobi_search: function () {
        var This = this;
        $("#search_lietuobi").click(function () {
            //加载层
            var resid = $("#body").attr("resid");
            This.show_lietuobi(1, Sys_PageSize, true, resid, false);
        });
        //键盘enter事件																		
        $("input,select,#search_lietuobi").keydown(function (e) {
            if (e.keyCode == 13) {
                var resid = $("#body").attr("resid");
                This.show_lietuobi(1, Sys_PageSize, true, resid, false);
            }
        });
        //页码的事件
        $(document).on("click", "#Pagination a[class='page']", function () {
            var page = $(this).attr("page");				//当前页
            var resid = $("#body").attr("resid");
            This.show_lietuobi(page, Sys_PageSize, true, resid, false);
        });
        //点击页码跳转
        $(document).on("click", "#Pagination a[class='pageurl']", function () {
            if ($("#txtpage").val() > 0) {
                var page = $("#txtpage").val();				//当前页
                var resid = $("#body").attr("resid");
                This.show_lietuobi(page, Sys_PageSize, true, resid, false);
            }
        });
        //添加功能
        $("#Add").click(function () {
            layer.open({
                title: '添加',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['400px', '350px'],
                fix: false, //不固定
                maxmin: true,
                content: '/LieTuoBi/Add'
            });
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
                userid: $("#userid").find("option:selected").val(),
                ispostback: true
            };
        }
        else {
            This.option = {
                userid: parent.$("#userid").find("option:selected").val(),
                ispostback: true
            };
        }
    },
    show_lietuobi: function (pagescurrent, pagesize, async_flag, resid, ispostback) {
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
            url: "/LieTuoBi/Index",
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
        //添加操作
        $("#Save_Add").click(function () {

            //判断参数
            if (!This.VerifyName()) {
                return;
            }
            if (!This.VerifyLieTuoBi()) {
                return;
            }
            //获取参数
            if (!This.check_data()) {
                return;
            }

            layer.load();
            $.ajax({
                url: "/LieTuoBiOperation/Add",// getActionPath("AdminSearch", "Admin"),
                dataType: "json",
                contentType: 'application/json',
                type: "POST",
                async: true,
                data: stringify({ info: This.edit_data }),
                success: function (data) {
                    //关闭loading对话框
                    layer.closeAll('loading');
                    if (data.success == true) {
                        //关闭弹框
                        This.show_lietuobi(1, Sys_PageSize, true, resid, true);
                    }
                    else if (data.error == 2) {
                        layerMsgCall("登录已过期请您重新登录", function () {
                            parent.window.location.href = "/Home/OutLogin";
                        })
                    }
                    else {
                        layerMsg("数据库操作失败");
                    }
                },
                error: function (request, status, errorThrown) {
                    layerMsg("Ajax请求失败");
                }
            });
        });
        //修改操作
        $("#Save_Edit").click(function () {
            //判断参数
            if (!This.VerifyName()) {
                return;
            }
            if (!This.VerifyMobile()) {
                return;
            }
            if (!This.VerifyLouPan()) {
                return;
            }
            //获取参数
            if (!This.check_data()) {
                return;
            }
            var _page = parent.$("a[class='curr']").attr("page");
            layer.load();
            $.ajax({
                url: "/CustomerOperation/Edit",// getActionPath("AdminSearch", "Admin"),
                dataType: "json",
                contentType: 'application/json',
                type: "POST",
                async: true,
                data: stringify({ info: This.edit_data }),
                success: function (data) {
                    //关闭loading对话框
                    layer.closeAll('loading');
                    if (data.success == true) {
                        // 刷新页面
                        //关闭弹框
                        This.show_customer(_page, Sys_PageSize, true, resid, true);
                    }
                    else if (data.error == 2) {
                        layerMsgCall("登录已过期请您重新登录", function () {
                            parent.window.location.href = "/Home/OutLogin";
                        })
                    }
                    else {
                        layerMsg("数据库操作失败");
                    }
                },
                error: function (request, status, errorThrown) {
                    layerMsg("Ajax请求失败");
                }
            });
        });
        //分配操作
        $("#Submit_Server").click(function () {
            var _page = parent.$("a[class='curr']").attr("page");
            var idlist = $("#idlist").val();
            obj = $("input[name='list_radio']");
            console.info(id);
            check_val = [];
            for (k in obj) {
                if (obj[k].checked)
                    check_val.push(obj[k].value);
            }
            var id = check_val[0];
            layer.load();
            $.ajax({
                url: "/CustomerOperation/FenPei",// getActionPath("AdminSearch", "Admin"),
                dataType: "json",
                contentType: 'application/json',
                type: "POST",
                async: true,
                data: stringify({ idlist: idlist, id: id }),
                success: function (data) {
                    //关闭loading对话框
                    layer.closeAll('loading');
                    if (data.success == true) {
                        // 刷新页面
                        //关闭弹框
                        This.show_customer(_page, Sys_PageSize, true, resid, true);
                    }
                    else if (data.error == 2) {
                        layerMsgCall("登录已过期请您重新登录", function () {
                            parent.window.location.href = "/Home/OutLogin";
                        })
                    }
                    else {
                        layerMsg("数据库操作失败");
                    }
                },
                complete: function () {
                    // $("#list_checkbox_all").attr("checked", false);
                },
                error: function (request, status, errorThrown) {
                    layerMsg("Ajax请求失败");
                }
            });
        });
    },
    check_data: function (type) {
        var This = this;
        This.edit_data.id = $("#id").val();
        This.edit_data.userid = $("#userid").find("option:selected").val();
        This.edit_data.lietuobi = $("#lietuobi").val();
        This.edit_data.type = 0;
        This.edit_data.customerid = 0;
        This.edit_data.meto = $("#meto").val();
        return true;
    },
    VerifyMobile: function () {
        if (!IsMobilePhone($("#mobile").val())) {
            $("#mobile").css("border", "1px solid red");
            return false;
        }
        else {
            return true;
        }
    },
    //姓名
    VerifyName: function () {
        var This = this;
        if ($("#userid").val() ==undefined) {
            $("#userid").css("border", "1px solid red");
            return false;
        }
        $("#userid").css("border", "");
        return true;
    },
    //楼盘名称
    VerifyLouPan: function () {
        var This = this;
        if ($("#loupanname").val() == "") {
            $("#loupanname").css("border", "1px solid red");
            return false;
        }
        $("#loupanname").css("border", "");
        return true;
    },
    VerifyLieTuoBi: function () {
        var This = this;
        if ($("#lietuobi").val() =="") {
            $("#lietuobi").css("border", "1px solid red");
            return false;
        }
        $("#lietuobi").css("border", "");
        return true;
    },
}