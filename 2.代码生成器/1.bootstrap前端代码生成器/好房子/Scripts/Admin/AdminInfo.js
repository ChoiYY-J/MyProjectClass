var admin_option = function () {
    this.option = {};
    this.edit_data = {};
}
admin_option.prototype = {
    show_admin_search: function () {
        var This = this;
        $("#search_admin").click(function () {
            //加载层
            var resid = $("#body").attr("resid");
            This.show_admin_list(1, Sys_PageSize, true, resid, false);
        });
        //键盘enter事件																		
        $("input,select,#search_admin").keydown(function (e) {
            if (e.keyCode == 13) {
                var resid = $("#body").attr("resid");
                This.show_admin_list(1, Sys_PageSize, true, resid, false);
            }
        });
        $(document).on("click", ".LouPan", function () {
            var _id = $(this).parent().attr("tid");
            layer.open({
                title: '楼盘',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['700px', '600px'],
                fix: false, //不固定
                maxmin: true,
                content: '/Admin/LouPan?id=' + _id
            });
        });
        $(document).on("click", ".admin_edit", function () {
            var _id = $(this).parent().attr("tid");
            layer.open({
                title: '修改',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['700px', '600px'],
                fix: false, //不固定
                maxmin: true,
                content: '/Admin/EditAdmin?id=' + _id
            });
        });
      
        $(document).on("click", ".admin_setpassword", function () {
            console.info(1);
            var name = $(this).parent().parent().find("td").eq(1).text();
            console.info(name);
            var _id = $(this).parent().attr("tid");
            layer.open({
                title: name + '-数据管理',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['800px', '600px'],
                fix: false, //不固定
                maxmin: true,
                content: '/Admin/ResetPwd?id=' + _id
            });
        });
        $(document).on("click", ".admin_delete", function () {
            var _id = $(this).parent().attr("tid");
            layerConfirm("您确定要删除吗？", function () {
                var _page = parent.$("a[class='curr']").attr("page");
                $.ajax({
                    url: "/AdminOperation/deleteAdmin?id=" + _id,// getActionPath("AdminSearch", "Admin"),
                    dataType: "json",
                    contentType: 'application/json',
                    type: "POST",
                    async: true,
                    success: function (data) {
                        //关闭loading对话框
                        layer.closeAll('loading');
                        if (data.success == true) {
                            // 刷新页面
                            layer.closeAll('dialog');
                            //关闭弹框
                            var resid = $("#body").attr("resid");
                            This.show_admin_list(_page, Sys_PageSize, true, resid, false);
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
            })
        });
        $("#add").click(function () {
            layer.open({
                title: '添加',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['700px', '600px'],
                fix: false, //不固定
                maxmin: true,
                content: '/Admin/AddAdmin'
            });
        });
        //页码的事件
        $(document).on("click", "#Pagination a[class='page']", function () {
            var page = $(this).attr("page");				//当前页
            var resid = $("#body").attr("resid");
            This.show_admin_list(page, Sys_PageSize, true, resid, false);
        });
        //点击页码跳转
        $(document).on("click", "#Pagination a[class='pageurl']", function () {
            if ($("#txtpage").val() > 0) {
                var page = $("#txtpage").val();				//当前页
                var resid = $("#body").attr("resid");
                This.show_admin_list(page, Sys_PageSize, true, resid, false);
            }
        });
    },
    get_option_search: function (ispostback) {
        var This = this;
        if (!ispostback) {
            This.option = {
                username: $("#search_name").val(),
                mobile: $("#search_mobile").val(),
                ispostback: true
            };
        }
        else {
            This.option = {
                username: parent.$("#search_name").val(),
                mobile: parent.$("#search_mobile").val(),
                ispostback: true
            };
        }
    },
    //数据列表展示
    show_admin_list: function (pagescurrent, pagesize, async_flag, resid, ispostback) {
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
            url: "/Admin/Index",
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
                    }
                    else {
                        parent.$("#list").append(data.strHtml);
                        parent.$("#Pagination").append(data.strPage);
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
    admin_edit_add: function () {
        var This = this;
        var resid = parent.$("#body").attr("resid");
        //验证参数
        $("#loginname").blur(function () {
            This.VerifyUserName();
        });
        $("#mobile").blur(function () {
            This.VerifyMobile();
        });
        $("#password").blur(function () {
            This.VerifyPwd();
        });
        $("#name").blur(function () {
            This.VerifyName();
        });

        $("#Save_Add").click(function () {
            //判断参数
            if (!This.VerifyUserName()) {
                return;
            }
            if (!This.VerifyPwd()) {
                return;
            }
           
            if (!This.VerifyMobile()) {
                return;
            }
            //获取参数
            if (!This.check_data()) {
                return;
            }
            layer.load();
            $.ajax({
                url: "/AdminOperation/SaveAddAdmin",// getActionPath("AdminSearch", "Admin"),
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
                        This.show_admin_list(1, Sys_PageSize, true, resid, true);
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
            if (!This.VerifyUserName()) {
                return;
            }
            if (!This.VerifyMobile()) {
                return;
            }
            //获取参数
            if (!This.check_data()) {
                return;
            }
            var _page = parent.$("a[class='curr']").attr("page");
            layer.load();
            $.ajax({
                url: "/AdminOperation/SaveEditAdmin",// getActionPath("AdminSearch", "Admin"),
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
                        This.show_admin_list(_page, Sys_PageSize, true, resid, true);
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

        $("#Reset_Pwd").click(function () {
            //判断参数
            if (!This.VerifyPassword()) {
                return;
            }
            if (!This.VerifyConfirmPwd()) {
                return;
            }
            if (!This.VerifySame()) {
                return;
            }
            //获取参数
            if (!This.check_data()) {
                return;
            }
            var _page = parent.$("a[class='curr']").attr("page");
            layer.load();
            $.ajax({
                url: "/AdminOperation/PwdReset",// getActionPath("AdminSearch", "Admin"),
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
                        This.show_admin_list(_page, Sys_PageSize, true, resid, true);
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
        $("#Save_LouPan").click(function () {
            var _page = parent.$("a[class='curr']").attr("page");
            //获取列表
            var loupanlist = "";
            $("input[name='list_loupan']:checked").each(function () {
                //alert($(this).val());
                loupanlist += $(this).val() + ",";
            })
            var id = $("#id").val();
            loupanlist = ("," + loupanlist);
            layer.load();
            $.ajax({
                url: "/AdminOperation/SaveLouPan",// getActionPath("userSearch", "user"),
                dataType: "json",
                contentType: 'application/json',
                type: "POST",
                async: true,
                data: stringify({ loupanlist: loupanlist, id: id }),
                success: function (data) {
                    //关闭loading对话框
                    layer.closeAll('loading');
                    if (data.success == true) {
                        // 刷新页面
                        //关闭弹框
                        This.show_admin_list(_page, Sys_PageSize, true, resid, true);
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
        })
    },
    check_data: function () {
        var This = this;
        This.edit_data.id = $("#id").val();
        //登录名
        This.edit_data.username = $.trim($("#loginname").val());
        //密码
        This.edit_data.password = $.trim($("#password").val());
        //姓名
        This.edit_data.company = $.trim($("#selcompany").val());
        //手机号
        This.edit_data.mobile = $("#mobile").val();
        This.edit_data.sex = $("#sex").val();
        //状态
        This.edit_data.state = $("#selectpaust").val();
        This.ispostback = true;
        //角色
        var _checked = $("input[type='checkbox']:checked");
        var role = ",";
        var strRole = ",";
        _checked.each(function () {
            role += $(this).val() + ",";
            strRole += $(this).attr("nametext") + ",";
        });
        This.edit_data.role = strRole;
        This.edit_data.rolelist = role;
        return true;
    },
    //账户
    VerifyUserName: function () {
        var This = this;
        if (IsEmpty($.trim($("#loginname").val()))) {
            $("#loginname").css("border", "1px solid red");
            return false;
        }
        else {
            $("#loginname").css("border", "");
            return true;
        }
    },
    //手机号
    VerifyMobile: function () {
        var This = this;
        if (!IsMobilePhone($.trim($("#mobile").val()))) {
            $("#mobile").css("border", "1px solid red");
            return false;
        }
        else {
            $("#mobile").css("border", "");
            return true;
        }
    },
    //密码
    VerifyPwd: function () {
        var This = this;
        if (IsEmpty($.trim($("#password").val()))) {
            $("#password").css("border", "1px solid red");
            return false;
        }
        else {
            $("#password").css("border", "");
            return true;
        }
    },
    //姓名
    VerifyName: function () {
        var This = this;
        if (IsEmpty($.trim($("#name").val()))) {
            $("#name").css("border", "1px solid red");
            return false;
        }
        else {
            $("#name").css("border", "");
            return true;
        }
    },
    //密码
    VerifyPassword: function () {
        var This = this;
        if ($("#password").val() == "") {
            $("#password").css("border", "1px solid red");
            return false;
        }
        $("#password").css("border", "");
        return true;
    },
    //密码
    VerifyConfirmPwd: function () {
        var This = this;
        if ($("#confirPwd").val() == "") {
            $("#confirPwd").css("border", "1px solid red");
            return false;
        }
        $("#confirPwd").css("border", "");
        return true;
    },
    VerifySame: function () {
        if ($("#password").val() == $("#confirPwd").val()) {
            return true;
        }
        else {
            $("#password").css("border", "1px solid red");
            $("#confirPwd").css("border", "1px solid red");
            return false;
        }
    },
}