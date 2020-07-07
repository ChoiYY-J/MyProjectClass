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
        //添加功能
        $("#Add").click(function () {
            layer.open({
                title: '添加',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['900px', '500px'],
                fix: false, //不固定
                maxmin: true,
                content: '/Customer/Add'
            });
        });
        //导入功能
        $("#DaoRu").click(function () {
            layer.open({
                title: '导入',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['900px', '500px'],
                fix: false, //不固定
                maxmin: true,
                content: '/Customer/DaoRu'
            });
        });
        //退会
        $("#TuiHui").click(function () {
            layer.open({
                title: '退会',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['900px', '500px'],
                fix: false, //不固定
                maxmin: true,
                content: '/Customer/TuiHui'
            });
        });
        //上传状态
        $("#UploadState").click(function () {
            layer.open({
                title: '上传状态',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['900px', '500px'],
                fix: false, //不固定
                maxmin: true,
                content: '/Customer/UploadState'
            });
        });
        //导入客户池
        $("#DaoRuWeiLingQu").click(function () {
            layer.open({
                title: '导入客户池',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['900px', '500px'],
                fix: false, //不固定
                maxmin: true,
                content: '/Customer/DaoRuWeiLingQu'
            });
        });
        //修改功能
        $(document).on("click", ".Edit", function () {
            var name = $(this).parent().parent().find("td").eq(1).text();
            var _id = $(this).parent().attr("tid");
            layer.open({
                title: name + '-修改',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['900px', '450px'],
                fix: false, //不固定
                maxmin: true,
                content: '/Customer/Edit?id=' + _id
            });
        });
        //放弃
        $(document).on("click", ".fangqi", function () {
            var name = $(this).parent().parent().find("td").eq(1).text();
            var _id = $(this).attr("cusid");
            layer.open({
                title: name + '-放弃',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['900px', '450px'],
                fix: false, //不固定
                maxmin: true,
                content: '/Customer/FangQi?customerid=' + _id
            });
        });
        //状态
        $(document).on("click", ".State", function () {
            var name = $(this).parent().parent().find("td").eq(1).text();
            var _id = $(this).parent().attr("tid");
            layer.open({
                title: name + '-改变状态信息',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['900px', '550px'],
                fix: false, //不固定
                maxmin: true,
                content: '/Customer/State?id=' + _id
            });
        });
        $(document).on("click", ".ChangeState", function () {
            var name = $(this).parent().parent().find("td").eq(1).text();
            var _id = $(this).parent().attr("tid");
            layer.open({
                title: name + '-改变状态',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['500px', '350px'],
                fix: false, //不固定
                maxmin: true,
                content: '/Customer/ChangeState?id=' + _id
            });
        });
        //附属
        $(document).on("click", ".FuShu", function () {
            var name = $(this).parent().parent().find("td").eq(1).text();
            var _id = $(this).parent().attr("tid");
            layer.open({
                title: name + '-附属电话号码',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['700px', '450px'],
                fix: false, //不固定
                maxmin: true,
                content: '/Customer/FuShu?id=' + _id
            });
        });
        //回访
        $(document).on("click", ".HuiFang", function () {
            var name = $(this).parent().parent().find("td").eq(1).text();
            var _id = $(this).parent().attr("tid");
            layer.open({
                title: name + '-回访',
                type: 2,
                shade: [0.5, '#b3b3b3'],
                area: ['900px', '550px'],
                fix: false, //不固定
                maxmin: true,
                content: '/Customer/HuiFang?id=' + _id
            });
        });
        //分配
        $("#FenPei").click(function () {
            obj = $("input[name='list_checkbox']");
            check_val = [];
            for (k in obj) {
                if (obj[k].checked)
                    check_val.push(obj[k].value);
            }
            if (check_val.length > 0) {
                var idlist = check_val.join('-');
                layer.open({
                    title: '分配',
                    type: 2,
                    shade: [0.5, '#b3b3b3'],
                    area: ['800px', '600px'],
                    fix: false, //不固定
                    maxmin: true,
                    content: '/Customer/FenPei?idlist=' + idlist
                });
            }
            else {
                layerMsg("请至少选择一条数据进行管理！");
            }
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
                loupanname: $("#loupanname").val(),
                mobile: $("#mobile").val(),
                CusState: $("#customer_state").val(),
                state: $("#state").val(),
                huifangid: $("#huifangid").val(),
                starttime: $("#starttime").val(),
                endtime: $("#endtime").val(),
                ispostback: true
            };
        }
        else {
            This.option = {
                name: parent.$("#name").val(),
                loupanname: parent.$("#loupanname").val(),
                mobile: parent.$("#mobile").val(),
                CusState: parent.$("#customer_state").val(),
                state: parent.$("#state").val(),
                huifangid: parent.$("#huifangid").val(),
                starttime: parent.$("#starttime").val(),
                endtime: parent.$("#endtime").val(),
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
            url: "/Customer/Index",
            dataType: "json",
            contentType: 'application/json',
            type: "POST",
            async: async_flag,
            data: stringify({ resid: resid, info: option }),
            success: function (data) {
                //关闭loading对话框
                layer.closeAll('loading');
                $("#SearchCount").text(data.total);
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

            layer.load();
            $.ajax({
                url: "/CustomerOperation/Add",// getActionPath("AdminSearch", "Admin"),
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
                        This.show_customer(1, Sys_PageSize, true, resid, true);
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
        $("#Save_Change").click(function () {
            var customerid = $("#customerid").val();
            var state = $("#changestate").val();
            var meto = $("#meto").val();
            layer.load();
            $.ajax({
                url: "/CustomerOperation/ChangeState",// getActionPath("AdminSearch", "Admin"),
                dataType: "json",
                contentType: 'application/json',
                type: "POST",
                async: true,
                data: stringify({ customerid: customerid, state: state,meto:meto }),
                success: function (data) {
                    //关闭loading对话框
                    layer.closeAll('loading');
                    if (data.success == true) {
                        //关闭弹框
                        This.show_customer(1, Sys_PageSize, true, resid, true);
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
        if ($("#name").val() == "") {
            $("#name").css("border", "1px solid red");
            return false;
        }
        $("#name").css("border", "");
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
}