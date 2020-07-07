var user_option = function () {
    this.option = {};
    this.edit_data = {};
}
user_option.prototype = {
    show_user_search: function () {
        var This = this;
        $("#search_user").click(function () {
            //加载层
            var resid = $("#body").attr("resid");
            This.show_user_list(1, Sys_PageSize, true, resid, false);
        });
        //键盘enter事件																		
        $("input,select,#search_user").keydown(function (e) {
            if (e.keyCode == 13) {
                var resid = $("#body").attr("resid");
                This.show_user_list(1, Sys_PageSize, true, resid, false);
            }
        });
        $(document).on("click", ".Edit", function () {
            var _id = $(this).parent().attr("tid");
            layer.open({
                title: '修改',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['700px', '600px'],
                fix: false, //不固定
                maxmin: true,
                content: '/user/Edit?id=' + _id
            });
        });
        $(document).on("click", ".FenXi", function () {
            var _id = $(this).parent().attr("tid");
            layer.open({
                title: '客户分析',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['1000px', '800px'],
                fix: false, //不固定
                maxmin: true,
                content: '/user/FenXi?userid=' + _id
            });
        });
        $(document).on("click", ".LingQu", function () {
            var _id = $(this).parent().attr("tid");
            layer.open({
                title: '客户分析',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['1000px', '800px'],
                fix: false, //不固定
                maxmin: true,
                content: '/user/LingQu?userid=' + _id
            });
        });
        $(document).on("click", ".LieTuoBi", function () {
            var _id = $(this).parent().attr("tid");
            layer.open({
                title: '猎拓币明细',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['1000px', '800px'],
                fix: false, //不固定
                maxmin: true,
                content: '/user/LieTuoBi?userid=' + _id
            });
        });
        $(document).on("click", ".ChuLi", function () {
            var _id = $(this).parent().attr("tid");
            layer.open({
                title: '猎拓币明细',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['1000px', '800px'],
                fix: false, //不固定
                maxmin: true,
                content: '/user/ChuLi?userid=' + _id
            });
        });
        //重置密码
        $(document).on("click", ".ResetPwd", function () {
            var name = $(this).parent().parent().find("td").eq(2).text();
            var _id = $(this).parent().attr("tid");
            layer.open({
                title: name + '-重置密码',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['600px', '300px'],
                fix: false, //不固定
                maxmin: true,
                content: '/User/ResetPwd?id=' + _id
            });
        });
        //更改简介
        $(document).on("click", ".JianJie", function () {
            var name = $(this).parent().parent().find("td").eq(2).text();
            var _id = $(this).parent().attr("tid");
            layer.open({
                title: name + '-简介',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['700px', '500px'],
                fix: false, //不固定
                maxmin: true,
                content: '/User/JianJie?id=' + _id
            });
        });
        $(document).on("click", ".user_setpassword", function () {
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
                content: '/user/ResetPwd?id=' + _id
            });
        });
        $(document).on("click", ".loupan", function () {
            var _id = $(this).parent().attr("tid");
            layer.open({
                title: '楼盘',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['700px', '600px'],
                fix: false, //不固定
                maxmin: true,
                content: '/User/LouPan?id=' + _id
            });
        });
        $("#Add").click(function () {
            layer.open({
                title: '添加',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['700px', '600px'],
                fix: false, //不固定
                maxmin: true,
                content: '/User/Add'
            });
        });
        //页码的事件
        $(document).on("click", "#Pagination a[class='page']", function () {
            var page = $(this).attr("page");				//当前页
            var resid = $("#body").attr("resid");
            This.show_user_list(page, Sys_PageSize, true, resid, false);
        });
        //点击页码跳转
        $(document).on("click", "#Pagination a[class='pageurl']", function () {
            if ($("#txtpage").val() > 0) {
                var page = $("#txtpage").val();				//当前页
                var resid = $("#body").attr("resid");
                This.show_user_list(page, Sys_PageSize, true, resid, false);
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
    show_user_list: function (pagescurrent, pagesize, async_flag, resid, ispostback) {
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
            url: "/user/Index",
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
    user_edit_add: function () {

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
        $("#manage").change(function () {
            var ismanage = $(this).val();
            if (ismanage == 1) {
                $("#divmanage").show();
            }
            else {
                $("#divmanage").hide();
            }
        })
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
                url: "/UserOperation/Add",// getActionPath("userSearch", "user"),
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
                        This.show_user_list(1, Sys_PageSize, true, resid, true);
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
                url: "/UserOperation/Edit",// getActionPath("userSearch", "user"),
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
                        This.show_user_list(_page, Sys_PageSize, true, resid, true);
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
            if (!This.VerifyPwd()) {
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
                url: "/userOperation/PwdReset",// getActionPath("userSearch", "user"),
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
                        This.show_user_list(_page, Sys_PageSize, true, resid, true);
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
                url: "/UserOperation/LouPan",// getActionPath("userSearch", "user"),
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
                        This.show_user_list(_page, Sys_PageSize, true, resid, true);
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
        //修改密码
        $("#Reset_Pwd_HT").click(function () {
            //判断参数
            if (!This.VerifyPwd()) {
                return;
            }
            if (!This.VerifySame()) {
                return;
            }
            var id = $("#id").val();
            var password = $("#password").val();
            var _page = parent.$("a[class='curr']").attr("page");
            layer.load();
            $.ajax({
                url: "/UserOperation/ResetPwd",// getActionPath("AdminSearch", "Admin"),
                dataType: "json",
                contentType: 'application/json',
                type: "POST",
                async: true,
                data: stringify({ id: id, password: password }),
                success: function (data) {
                    //关闭loading对话框
                    layer.closeAll('loading');
                    if (data.success == true) {
                        // 刷新页面
                        //关闭弹框
                        This.show_user_list(_page, Sys_PageSize, true, resid, true);
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
        //更新简介
        $("#Save_Meto").click(function () {
            var id = $("#id").val();
            var img = $("#img").attr("src");
            var chuanboimg = $("#chuanboimg").attr("src");
            var meto = $("#meto").val();
            var _page = parent.$("a[class='curr']").attr("page");
            layer.load();
            $.ajax({
                url: "/UserOperation/JianJie",// getActionPath("userSearch", "user"),
                dataType: "json",
                contentType: 'application/json',
                type: "POST",
                async: true,
                data: stringify({ id: id,img:img, chuanboimg: chuanboimg, meto: meto }),
                success: function (data) {
                    //关闭loading对话框
                    layer.closeAll('loading');
                    if (data.success == true) {
                        // 刷新页面
                        //关闭弹框
                        This.show_user_list(_page, Sys_PageSize, true, resid, true);
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
        This.edit_data.username = $.trim($("#loginname").val());
        //密码
        This.edit_data.password = $.trim($("#password").val());
        //手机号
        This.edit_data.mobile = $("#mobile").val();
        This.edit_data.sex = $("#sex").val();
        //状态
        This.edit_data.state = $("#selectpaust").val();
        //ismanage
        This.edit_data.ismanage = $("#manage").val();
        //zhiwu
        This.edit_data.zhiwu = $("#zhiwu").val();
        This.edit_data.type = $("#type").val();
        This.ispostback = true;
        //角色
        var _checked = $("input[type='checkbox']:checked");
        var role = ",";
        _checked.each(function () {
            role += $(this).val() + ",";
        });
        This.edit_data.role = role;
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