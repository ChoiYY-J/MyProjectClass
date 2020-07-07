var resources_option = function () {
    this.option = {};
    this.edit_data = {};
}
resources_option.prototype = {
    show_resources_search: function () {
        var This = this;
        $("#selectfirst").change(function () {
            var id = $("#selectfirst").val();
            This.show_resources_list(id, 0, true);
        });
        $("#selectsecond").change(function () {
            var id = $("#selectsecond").val();
            if (id == 0) {
                id = $("#selectfirst").val();
                This.show_resources_list(id, 0, true);
            }
            else {
                This.show_resources_list(id, 1, true);
            }
        });
        $("#thirstsecond").change(function () {
            var id = $("#thirstsecond").val();
            if (id == 0) {
                id = $("#selectsecond").val();
                This.show_resources_list(id, 1, true);
            }
            else {
                This.show_resources_list(id, 2, true);
            }
        });
        $(document).on("click", ".add", function () {
            var _td = $(this).parent().parent();
            var name = _td.find("td").eq(1).find("input").val();
            var menucode = _td.find("td").eq(2).find("input").val();
            var actionname = _td.find("td").eq(3).find("input").val();
            var controllername = _td.find("td").eq(4).find("input").val();
            var menutype = _td.find("td").eq(5).find("select").val();
            var sort = _td.find("td").eq(6).find("input").val();
            var ispause = _td.find("td").eq(7).find("select").val();
            var parentid = $(this).attr("parentid");
            var _menutype = $(this).attr("menutype");
            if (name == "") {
                layerMsg("请输入名称");
                return;
            }
            This.edit_data = {
                name: name,
                menucode: menucode,
                actionname: actionname,
                controllername: controllername,
                menutype: menutype,
                sort: sort,
                ispause: ispause,
                parentid: parentid
            };
            layer.load();
            $.ajax({
                url: "/AdminOperation/Per_ResourcesAdd",// getActionPath("AdminSearch", "Admin"),
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
                        This.show_resources_list(parentid, _menutype, true);
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

        });
        //修改
        $(document).on("click", ".res_edit", function () {
            var id = $(this).parent().attr("_id");
            //先把值取出来
            var _td = $(this).parent().parent();
            var oldname = _td.find("td").eq(1).text();
            var oldmenucode = _td.find("td").eq(2).text();
            var oldactionname = _td.find("td").eq(3).text();
            var oldcontrollername = _td.find("td").eq(4).text();
            var oldsort = _td.find("td").eq(6).text();
            var oldispause = _td.find("td").eq(7).attr("ispause");
            //新的文本
            _td.find("td").eq(1).html("<input type='text' class='span1' value='" + oldname + "'/>");
            _td.find("td").eq(2).html("<input type='text' class='span1' value='" + oldmenucode + "'/>");
            _td.find("td").eq(3).html("<input type='text' class='span1' value='" + oldactionname + "'/>");
            _td.find("td").eq(4).html("<input type='text' class='span1' value='" + oldcontrollername + "'/>");
            _td.find("td").eq(6).html("<input type='text' class='span1' value='" + oldsort + "'/>");
            _td.find("td").eq(7).html("<select calss='span2' style='width:140px'><option value='1'>正常</option><option value='0'>停用</option></select>");
            _td.find("td").eq(7).find("select").val(oldispause);
            _td.find("td").eq(8).html("<input type='button' class='btn save' value='保存' />");
        });
        //保存
        $(document).on("click", ".save", function () {
            //拿值
            var _td = $(this).parent().parent();
            var id = $(this).parent().attr("_id");
            var name = _td.find("td").eq(1).find("input").val();
            var menucode = _td.find("td").eq(2).find("input").val();
            var actionname = _td.find("td").eq(3).find("input").val();
            var controllername = _td.find("td").eq(4).find("input").val();
            var sort = _td.find("td").eq(6).find("input").val();
            var ispause = _td.find("td").eq(7).find("select").val();
            var parentid = $(this).parent().attr("parentid");
            var _menutype = $(this).parent().attr("menutype");
            if (name == "") {
                layerMsg("请输入名称");
                return;
            }
            This.edit_data = {
                id: id,
                name: name,
                menucode: menucode,
                actionname: actionname,
                controllername: controllername,
                sort: sort,
                ispause: ispause
            };
            layer.load();
            $.ajax({
                url: "/AdminOperation/Per_ResourcesEdit",
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
                        This.show_resources_list(parentid, _menutype, true);
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

        });

        //删除
        $(document).on("click", ".res_delete", function () {
            var id = $(this).parent().attr("_id");
            var parentid = $(this).parent().attr("parentid");
            var menutype = $(this).parent().attr("parentid");
            layerConfirm("确定删除吗?", function () {
                layer.load(2);
                $.ajax({
                    url: "/AdminOperation/Per_ResourcesDelete",
                    dataType: "json",
                    contentType: 'application/json',
                    type: "POST",
                    async: true,
                    data: stringify({ id: id }),
                    success: function (data) {
                        //关闭loading对话框
                        layer.closeAll('loading');
                        if (data.success == true) {
                            layer.closeAll('dialog');
                            // 刷新页面
                            This.show_resources_list(parentid, menutype, true);
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
            });
        });
    },
    //数据列表展示
    show_resources_list: function (parentid, menutype, async_flag) {
        var This = this;
        $("#list").empty();
        $("#foot").empty();
        var resid = $("#body").attr("resid");
        layer.load(2);
        $.ajax({
            url: "/Admin/Menu",// getActionPath("AdminSearch", "Admin"),
            dataType: "json",
            contentType: 'application/json',
            type: "POST",
            async: async_flag,
            data: stringify({ resid: resid, parentid: parentid, menutype: menutype, ispostback: true }),
            success: function (data) {
                //关闭loading对话框
                layer.closeAll('loading');
                if (data.success == true) {
                    // 刷新页面
                    $("#list").append(data.strHtml);
                    $("#foot").append(data.sbFoot);
                    if (menutype == 0) {
                        $("#selectsecond option:gt(0)").remove();
                        $("#thirstsecond option:gt(0)").remove();
                        if (parentid != 0) {
                            for (var i = 0; i < data.selList.length; i++) {
                                $("#selectsecond").append("<option value='" + data.selList[i].id + "'>" + data.selList[i].name + "</option>");
                            }
                        }
                        else {
                            $("#selectfirst option:gt(0)").remove();
                            for (var i = 0; i < data.selList.length; i++) {
                                $("#selectfirst").append("<option value='" + data.selList[i].id + "'>" + data.selList[i].name + "</option>");
                            }
                        }
                    }
                    if (menutype == 1) {
                        $("#thirstsecond option:gt(0)").remove();
                        if (parentid != 0) {
                            for (var i = 0; i < data.selList.length; i++) {
                                $("#thirstsecond").append("<option value='" + data.selList[i].id + "'>" + data.selList[i].name + "</option>");
                            }
                        }
                        else {
                            $("#selectsecond option:gt(0)").remove();
                            for (var i = 0; i < data.selList.length; i++) {
                                $("#selectsecond").append("<option value='" + data.selList[i].id + "'>" + data.selList[i].name + "</option>");
                            }
                        }
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
}