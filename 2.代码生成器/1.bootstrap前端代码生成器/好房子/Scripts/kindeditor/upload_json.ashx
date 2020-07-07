<%@ WebHandler Language="C#" Class="Upload" %>
using System;
using System.Collections;
using System.Web;
using System.IO;
using System.Globalization;
using LitJson;

public class Upload : IHttpHandler
{
    private HttpContext context;

    public void ProcessRequest(HttpContext context)
    {
        String aspxUrl = context.Request.Path.Substring(0, context.Request.Path.LastIndexOf("/") + 1);
        String CreatFolder = context.Request["CreatFolder"];
        string strQianTai = context.Request["qiantai"];

        //文件保存目录路径
        String savePath = "../attach/";

        //文件保存目录URL
        String saveUrl = aspxUrl + "../attach/";

        //定义允许上传的文件扩展名
        Hashtable extTable = new Hashtable();
        extTable.Add("image", "gif,jpg,jpeg,png,bmp");
        extTable.Add("flash", "swf,flv");
        extTable.Add("media", "swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb");
        extTable.Add("file", "doc,docx,xls,xlsx,ppt,htm,html,txt,zip,rar,gz,bz2");

        //最大文件大小
        int maxSize = 104857600;
        this.context = context;

        HttpPostedFile imgFile = context.Request.Files["imgFile"];
        if (imgFile == null)
        {
            showError("请选择文件。");
        }

        String dirPath = context.Server.MapPath(savePath);
        if (!Directory.Exists(dirPath))
        {
            Directory.CreateDirectory(dirPath);
        }

        ////////////////////////////上传目录复制一份到前台页面中去/////////////////////////
        //string dirPath2 = dirPath.Replace("\\Web\\", "\\" + strQianTai + "\\");
        //if (!Directory.Exists(dirPath2))
        //{
        //    Directory.CreateDirectory(dirPath2);
        //}
        ///////////////////////////////////////////////////////////////////////////////


        String dirName = context.Request.QueryString["dir"];
        if (String.IsNullOrEmpty(dirName))
        {
            dirName = "image";
        }
        if (!extTable.ContainsKey(dirName))
        {
            showError("目录名不正确。");
        }

        String fileName = imgFile.FileName;
        String fileExt = Path.GetExtension(fileName).ToLower();

        if (imgFile.InputStream == null || imgFile.InputStream.Length > maxSize)
        {
            showError("上传文件大小超过限制。");
        }

        if (String.IsNullOrEmpty(fileExt) || Array.IndexOf(((String)extTable[dirName]).Split(','), fileExt.Substring(1).ToLower()) == -1)
        {
            showError("上传文件扩展名是不允许的扩展名。\n只允许" + ((String)extTable[dirName]) + "格式。");
        }

        //创建文件夹
        dirPath += dirName + "/";
        saveUrl += dirName + "/";
        if (!Directory.Exists(dirPath))
        {
            Directory.CreateDirectory(dirPath);
        }

        ////////////////////////////上传目录复制一份到前台页面中去/////////////////////////
        //dirPath2 = dirPath.Replace("\\Web\\", "\\" + strQianTai + "\\");
        //if (!Directory.Exists(dirPath2))
        //{
        //    Directory.CreateDirectory(dirPath2);
        //}
        ///////////////////////////////////////////////////////////////////////////////


        String ymd = DateTime.Now.ToString("yyyyMM", DateTimeFormatInfo.InvariantInfo);
        dirPath += ymd + "/";
        saveUrl += ymd + "/";
        if (!Directory.Exists(dirPath))
        {
            Directory.CreateDirectory(dirPath);
        }

        ////////////////////////////上传目录复制一份到前台页面中去/////////////////////////
        //dirPath2 = dirPath.Replace("\\Web\\", "\\" + strQianTai + "\\");
        //if (!Directory.Exists(dirPath2))
        //{
        //    Directory.CreateDirectory(dirPath2);
        //}
        ///////////////////////////////////////////////////////////////////////////////

        String newFileName = DateTime.Now.ToString("yyyyMMddHHmmss_ffff", DateTimeFormatInfo.InvariantInfo) + fileExt;
        String filePath = dirPath + newFileName;

        imgFile.SaveAs(filePath);

        ////////////////////////////上传目录复制一份到前台页面中去/////////////////////////
        //string filePath2 = dirPath2 + newFileName;
        //imgFile.SaveAs(filePath2);
        ///////////////////////////////////////////////////////////////////////////////

        String fileUrl = saveUrl + newFileName;

        Hashtable hash = new Hashtable();
        hash["error"] = 0;
        hash["url"] = fileUrl;
        context.Response.AddHeader("Content-Type", "text/html; charset=UTF-8");
        context.Response.Write(JsonMapper.ToJson(hash));
        context.Response.End();
    }

    private void showError(string message)
    {
        Hashtable hash = new Hashtable();
        hash["error"] = 1;
        hash["message"] = message;
        context.Response.AddHeader("Content-Type", "text/html; charset=UTF-8");
        context.Response.Write(JsonMapper.ToJson(hash));
        context.Response.End();
    }

    public bool IsReusable
    {
        get
        {
            return true;
        }
    }
}
