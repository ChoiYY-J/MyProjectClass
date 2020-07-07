var chuanbo_option = function () {
    this.option = {};
    this.edit_data = {};
}
chuanbo_option.prototype = {
    chuanbo_search: function () {
        var This = this;
        var resid = $("#body").attr("resid");
        $("#search_chuanbo").click(function () {
            //加载层
            var resid = $("#body").attr("resid");
            This.show_chuanbo(1, Sys_PageSize, true, resid, false);
        });
        //键盘enter事件																		
        $("input,select,#search_chuanbo").keydown(function (e) {
            if (e.keyCode == 13) {
                var resid = $("#body").attr("resid");
                This.show_chuanbo(1, Sys_PageSize, true, resid, false);
            }
        });
        //修改功能
        $(document).on("click", ".Edit", function () {
            var name = $(this).parent().parent().find("td").eq(1).text();
            var _id = $(this).parent().attr("tid");
            layer.open({
                title: name + '-修改',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['1200px', '600px'],
                fix: false, //不固定
                maxmin: true,
                content: '/ChuanBo/Edit?id=' + _id
            });
        });
        $(document).on("click", ".userlist", function () {
            var name = $(this).parent().parent().find("td").eq(1).text();
            var _id = $(this).parent().attr("tid");
            layer.open({
                title: name + '-url',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['1200px', '600px'],
                fix: false, //不固定
                maxmin: true,
                content: '/ChuanBo/userlist?id=' + _id
            });
        });
        
        //添加功能
        $("#Add").click(function () {
            layer.open({
                title: '添加',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['1200px', '600px'],
                fix: false, //不固定
                maxmin: true,
                content: '/ChuanBo/Add'
            });
        });
        //停用
        $(document).on("click", ".Pause", function () {
            var _id = $(this).parent().attr("tid");
            var state = $(this).parent().attr("state");
            var resid = $("#body").attr("resid");
            var page = $(this).attr("page");				//当前页
            layer.confirm("确定停用吗", function () {
                layer.load();
                $.ajax({
                    url: "/ChuanBoOperation/IsPause",
                    dataType: "json",
                    contentType: 'application/json',
                    type: "POST",
                    async: true,
                    data: stringify({ id: _id, state: 0 }),
                    success: function (data) {
                        //关闭loading对话框
                        layer.closeAll('loading');
                        if (data.success == true) {
                            // 刷新页面
                            layer.closeAll('dialog');
                            This.show_chuanbo(page, Sys_PageSize, true, resid, false);
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
            })
        });
        //开启
        $(document).on("click", ".On", function () {
            var _id = $(this).parent().attr("tid");
            var state = $(this).parent().attr("state");
            var resid = $("#body").attr("resid");
            var page = $(this).attr("page");				//当前页
            layer.confirm("确定开启吗", function () {
                layer.load();
                $.ajax({
                    url: "/ChuanBoOperation/IsPause",
                    dataType: "json",
                    contentType: 'application/json',
                    type: "POST",
                    async: true,
                    data: stringify({ id: _id, state: 1 }),
                    success: function (data) {
                        //关闭loading对话框
                        layer.closeAll('loading');
                        if (data.success == true) {
                            // 刷新页面
                            layer.closeAll('dialog');
                            This.show_chuanbo(page, Sys_PageSize, true, resid, false);
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
            })
        });
        $("#ShangJia").click(function () {
            layerConfirm("您确定上架吗？", function () {
                obj = $("input[name='list_checkbox']");
                check_val = [];
                var flag = true;
                for (k in obj) {
                    if (obj[k].checked) {
                        check_val.push(obj[k].value);
                        if ($('#' + obj[k].id + '').attr("sid") != 0) {
                            flag = false;
                        }
                    }
                }
                if (flag == false) {
                    layerMsg("请选择已下架的楼盘！");
                    return;
                }
                var _page = parent.$("a[class='curr']").attr("page");
                if (check_val.length > 0) {
                    var idlist = check_val.join('-');
                    $.ajax({
                        url: "/ChuanBoOperation/ShenHe",// getActionPath("AdminSearch", "Admin"),
                        dataType: "json",
                        contentType: 'application/json',
                        type: "POST",
                        async: true,
                        data: stringify({ idlist: idlist, state: 1 }),
                        success: function (data) {
                            //关闭loading对话框
                            layer.closeAll('loading');
                            if (data.success == true) {
                                // 刷新页面
                                layer.closeAll('dialog');
                                //关闭弹框
                                This.show_chuanbo(_page, Sys_PageSize, true, resid, false);
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
                }
                else {
                    layerMsg("请至少选择一条数据进行审核！");
                }
            })
        });
        $("#XiaJia").click(function () {
            layerConfirm("您确定下架吗？", function () {
                obj = $("input[name='list_checkbox']");
                check_val = [];
                var flag = true;
                for (k in obj) {
                    if (obj[k].checked) {
                        check_val.push(obj[k].value);
                        if ($('#' + obj[k].id + '').attr("sid") != 1) {
                            flag = false;
                        }
                    }
                }
                if (flag == false) {
                    layerMsg("请选择已上架的楼盘！");
                    return;
                }
                var _page = parent.$("a[class='curr']").attr("page");
                if (check_val.length > 0) {
                    var idlist = check_val.join('-');
                    $.ajax({
                        url: "/ChuanBoOperation/ShenHe",// getActionPath("AdminSearch", "Admin"),
                        dataType: "json",
                        contentType: 'application/json',
                        type: "POST",
                        async: true,
                        data: stringify({ idlist: idlist, state: 0 }),
                        success: function (data) {
                            //关闭loading对话框
                            layer.closeAll('loading');
                            if (data.success == true) {
                                // 刷新页面
                                layer.closeAll('dialog');
                                //关闭弹框
                                This.show_chuanbo(_page, Sys_PageSize, true, resid, false);
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
                }
                else {
                    layerMsg("请至少选择一条数据进行审核！");
                }
            })
        });
        //页码的事件
        $(document).on("click", "#Pagination a[class='page']", function () {
            var page = $(this).attr("page");				//当前页
            var resid = $("#body").attr("resid");
            This.show_chuanbo(page, Sys_PageSize, true, resid, false);
        });
        //点击页码跳转
        $(document).on("click", "#Pagination a[class='pageurl']", function () {
            if ($("#txtpage").val() > 0) {
                var page = $("#txtpage").val();				//当前页
                var resid = $("#body").attr("resid");
                This.show_chuanbo(page, Sys_PageSize, true, resid, false);
            }
        });
        This.changState(false);
        //全选复选框
        $("#list_checkbox_all").click(function () {
            $("input[name='list_checkbox']").attr("checked", $("#list_checkbox_all").is(":checked"));
        });
    },
    changState: function (ispostback) {
        var This = this;
        if (!ispostback) {
            $("#list tr").each(function () {
                var state = $(this).find("td").eq(8).attr("state");
                if (state != 1) {
                    $(this).find("td").eq(8).find(".Pause").text("[开启]");
                    $(this).find("td").eq(8).find(".Pause").attr("class", "On");
                }
            })
        }
        else {
            parent.$("#list tr").each(function () {
                var state = $(this).find("td").eq(8).attr("state");
                if (state != 1) {
                    $(this).find("td").eq(8).find(".Pause").text("[开启]");
                    $(this).find("td").eq(8).find(".Pause").attr("class", "On");
                }
            })
        }
    },

    get_option_search: function (ispostback) {
        var This = this;
        if (!ispostback) {
            This.option = {
                title: $("#title").val(),
                cityid: $("#selCity").find("option:selected").val(),
                ispostback: true
            };
        }
        else {
            This.option = {
                title: parent.$("#title").val(),
                cityid: parent.$("#selCity").find("option:selected").val(),
                ispostback: true
            };
        }
    },
    show_chuanbo: function (pagescurrent, pagesize, async_flag, resid, ispostback) {
        var This = this;
        if (!ispostback) {
            $("#list").empty();
            $("#Pagination").empty();
            $("#list_checkbox_all").attr("checked", false);
        }
        else {
            parent.$("#list").empty();
            parent.$("#Pagination").empty();
            parent.$("#list_checkbox_all").attr("checked", false);
        }
        This.get_option_search(ispostback);
        Sys_PageSize = pagesize;
        var option = $.extend(This.option, { PageIndex: pagescurrent, PageSize: Sys_PageSize });
        layer.load();
        $.ajax({
            url: "/ChuanBo/Index",
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
        var resid = parent.$("#body").attr("resid");

        $("#Save_Add").click(function () {

            //判断参数
            if (!This.VerifyTitle()) {
                return;
            }
            //获取参数
            if (!This.check_data()) {
                return;
            }

            layer.load();
            $.ajax({
                url: "/ChuanBoOperation/Add",// getActionPath("AdminSearch", "Admin"),
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
                        This.show_chuanbo(1, Sys_PageSize, true, resid, true);
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

        $("#Save_Edit").click(function () {
            //判断参数
            if (!This.VerifyCity()) {
                return;
            }
            //获取参数
            if (!This.check_data()) {
                return;
            }
            var _page = parent.$("a[class='curr']").attr("page");
            layer.load();
            $.ajax({
                url: "/ChuanBoOperation/Edit",// getActionPath("AdminSearch", "Admin"),
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
                        This.show_chuanbo(_page, Sys_PageSize, true, resid, true);
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
    },
    check_data: function () {
        var This = this;
        This.edit_data.id = $("#id").val();
        //楼盘
        This.edit_data.sort = $("#sort").val();
        var json = "";
        $(".add").find("input").each(function () {
            var around = $(this).val();
            json += around + ",";
        });
        if (json.length > 0)
            json = json.substring(0, json.length - 1);
        This.edit_data.keywords = json;
        This.edit_data.content = $("#txtContent").val();
        This.edit_data.source = $("#source").val();
        This.edit_data.description = $("#description").val();
        This.edit_data.author = $("#author").val();
        This.edit_data.title = $("#title").val();
        This.edit_data.out_url = $("#out_url").val();
        This.edit_data.meto = $("#meto").val();
        return true;
    },
    VerifyMobile: function () {
        if ($("#phone").val() == "") {
            $("#phone").css("border", "1px solid red");
            return false;
        }
        else {
            return true;
        }
    },
    //标题
    VerifyTitle: function () {
        if ($("#title").val() == "") {
            $("#title").css("border", "1px solid red");
            return false;
        }
        else {
            $("#title").css("border", "");
            return true;
        }
    },
    //城市
    VerifyCity: function () {
        var This = this;
        if ($("#selCity").val() < 1) {
            $("#selCity").css("border", "1px solid red");
            return false;
        }
        else {
            $("#selCity").css("border", "");
            return true;
        }
    },
    //别名
    VerifyOthername: function () {
        var This = this;
        if ($("#othername").val() == "") {
            $("#othername").css("border", "1px solid red");
            return false;
        }
        else {
            $("#othername").css("border", "");
            return true;
        }
    },
    //图片
    VerifyImg: function () {
        var This = this;
        if ($("#imgsrc").attr("src") == "" || $("#imgsrc").attr("src") == null) {
            $("#imgsrc").css("border", "1px solid red");
            return false;
        }
        else {
            $("#imgsrc").css("border", "");
            return true;
        }
    },
    //时间
    VerifyIsTrue: function () {
        var This = this;
        if ($("#istrue").val() == "1" && ($("#time").val() == "" || $("#time").val() == null)) {
            $("#time").css("border", "1px solid red");
            $("#istrue").css("border", "1px solid red");
            return false;
        }
        else {
            $("#time").css("border", "");
            $("#istrue").css("border", "");
            return true;
        }
    },
    //金额
    VerifyMoney: function () {
        var This = this;
        if ($("#istrue").val() == "1" && $("#money").val() == "") {
            $("#money").css("border", "1px solid red");
            $("#istrue").css("border", "1px solid red");
            return false;
        }
        else {
            $("#money").css("border", "");
            $("#istrue").css("border", "");
            return true;
        }
    },
    //地区
    VerifyArea: function () {
        var This = this;
        if ($("#selArea").val() < 1) {
            $("#selArea").css("border", "1px solid red");
            return false;
        }
        $("#selArea").css("border", "");
        return true;
    },

    //楼盘
    VerifyName: function () {
        var This = this;
        if ($("#name").val() == "") {
            $("#name").css("border", "1px solid red");
            return false;
        }
        $("#name").css("border", "");
        return true;
    },
}