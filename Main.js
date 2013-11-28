//HTML5游戏开发者社区-白泽

//初始化背景音乐并且播放
var backgroundSound=document.getElementById("backgroundSound");
try {
    backgroundSound.play();
}
catch (e) {
    if(window.console && console.error("Error:" + e));
}
//初始化点击时的音效
var clickSound=document.getElementById("clickSound");

//初始化连接时的音效
var connect=document.getElementById("connect");

//帧事件对象
var frameFun=new FrameFunction();

//练练看算法类
var asqare2D=new Asqare2D();

//连连看路径数组
var pathList;

//点击列表
var clickQuadList=[];

//XML数据
var xmldata;

//粒子图片
var circleImag;

//图块图片
var imgae;

//连连看地图数组
var mapList=[];

//两个粒子发射器
var grainsend_1;
var grainsend_2;


//粒子运动轨迹ID
var ids=0;

//动作列表
var quadActionList=[];

//粒子运动轨迹的计时器
var time=0;

//QUAD的动作类
function QuadAction(v_quad)
{
    var quad=v_quad;

    var dx=0;
    var dy=0;
    var wx=0;
    var hy=0;

    //速度
    var speed=.67;

    //摩擦力
    var frime=.6;

    var rotation=0;

    //这个属性对外公开,点击时可设置这个属性为2,意思是让图块变大
    this.scale=1;
    this.run=function()
    {
        //让图块的角度和比例不同程度的头东
        rotation=Math.random()*10;

        //弹性公式
        dx=(rotation-quad.getRotation())*speed;
        dy=(this.scale-quad.getScaleX())*speed;
        wx+=dx;
        hy+=dy;
        wx*=frime;
        hy*=frime;
        quad.setRotation(quad.getRotation()+wx);
        quad.setScaleX(quad.getScaleX()+hy);
        quad.setScaleY(quad.getScaleX());
    }
}

//清理QUAD的显示状态和点击列表
function clearClickQuad()
{
    for(var i=0;i<clickQuadList.length;i++)
    {
        clickQuadList[i].getUserData().scale=1;
        clickQuadList[i].setR(1);
        clickQuadList[i].setG(1);
        clickQuadList[i].setB(1);
    }
    clickQuadList=[];
}

//按下鼠标时
function downQuad(value)
{
    //判断点击的对象是否为空
    if(value.getTargetQuad()!=null)
    {

        //播放点击音效
        try {
            clickSound.currentTime=0;
            clickSound.play();
        }
        catch (e) {
            if(window.console && console.error("Error:" + e));
        }

        //设置点击对象的显示效果
        value.getTargetQuad().getUserData().scale=1.3;
        value.getTargetQuad().setR(1.5);
        value.getTargetQuad().setG(1.5);
        value.getTargetQuad().setB(1.5);

        //如果当前数长度为0,则直接添加到点击列表里
        if(clickQuadList.length==0)
        {
            clickQuadList.push(value.getTargetQuad());
        }else if(clickQuadList.length==1)
        {
            //如果点击列表长度为1,则判断是否重复点击并且点击的图块类型是否相同,这里利用动画场景ID来判断
            if(value.getTargetQuad().getX()!=clickQuadList[0].getX()||value.getTargetQuad().getY()!=clickQuadList[0].getY())
            if(value.getTargetQuad().getScene()==clickQuadList[0].getScene())
            {
                //如果是则添加到点击列表
                clickQuadList.push(value.getTargetQuad());

                //分别计算点击列表中对象的行和列
                var row1=Math.floor((clickQuadList[0].getY()-50)/50);
                var line1=Math.floor((clickQuadList[0].getX()-60)/50);

                var row2=Math.floor((clickQuadList[1].getY()-50)/50);
                var line2=Math.floor((clickQuadList[1].getX()-60)/50);

                //判断是否可以相连
                pathList=asqare2D.getPath(mapList,[row1,line1],[row2,line2])

                //如果路径不为空,则代表是可以连接的s
                if(pathList!=null)
                {
                    //播放连接音效
                    try {
                        connect.currentTime=0;
                        connect.play();
                    }
                    catch (e) {
                        if(window.console && console.error("Error:" + e));
                    }
                    

                    //播放点击列表中的QUAD的动画
                    clickQuadList[0].play();
                    clickQuadList[1].play();

                    //清空连击列表
                    clickQuadList=[];

                    //设置地图数据,消除的地方为0
                    mapList[row1][line1]=0;
                    mapList[row2][line2]=0;

                    //重置粒子运动的位置ID
                    ids=0;

                    //设置2个粒子的坐标和随机颜色,并且启用粒子播放
                    grainsend_1.y=pathList[ids][0]*50+50;
                    grainsend_1.x=pathList[ids][1]*50+60;
                    grainsend_1.r=Math.random()*2;
                    grainsend_1.g=Math.random()*2;
                    grainsend_1.b=Math.random()*2;
                    grainsend_1.isPlay=true;

                    grainsend_2.y=pathList[pathList.length-1][0]*50+50;
                    grainsend_2.x=pathList[pathList.length-1][1]*50+60;
                    grainsend_2.r=Math.random()*2;
                    grainsend_2.g=Math.random()*2;
                    grainsend_2.b=Math.random()*2;
                    grainsend_2.isPlay=true;

                }else
                {
                    //清理点击列表
                    clearClickQuad();
                }
            }else
            {

                //清理点击列表
                clearClickQuad();

                //重新放入新的点击对象
                clickQuadList.push(value.getTargetQuad());
            }
        }
    }
}

//帧事件
function remove(e)
{
    //如果动画播放结束那么移除这个事件
    e.removeFrameScript(frameFun);

    //不显示这个元素
    e.setVisible(false);
}

function imageLoad(e)
{
    circleImag=e;

    //创建游戏场景
    var stage2d=new Stage2D();

    //添加帧事件函数,游戏的核心线程
    stage2d.getEvent2D().addEventListener(Event2D.prototype.EVENT_FRAME,run);

    //添加鼠标事件
    stage2d.getEvent2D().addEventListener(MouseEvent2D.prototype.MOUSE_DOWN,downQuad);

    //创建纹理
    var texture=new Texture2D(imgae,xmldata);

    //创建着色器
    var shader=new Shader();

    //创建连连的二维数组
    for(var h=0;h<10;h++)
    {
        var arr=[];
        for(var l=0;l<14;l++)
        {
            arr.push(parseInt(Math.random()*12)+1);
        }
        mapList.push(arr);
    }

    //创建游戏需要用到的显示对象
    var mc=new MovieClip2D(10*14+1,texture,shader);

    //添加到场景上
    stage2d.addChild(mc);

    //获取一个背景
    var bc=mc.getQuad();

    //设置动画场景名称
    bc.setScene("setting");

    //取消鼠标事件
    bc.setMouseEnabled(false);

    //设置宽度和高度
    bc.setWidth(800);
    bc.setHeight(600);

    //添加到网格列表里显示
    mc.addQuad(bc);

    //初始化连连看图块
    for(var i=0;i<mapList.length;i++)
    {
        for(var j=0;j<mapList[i].length;j++)
        {
            var quad=mc.getQuad();
            quad.setX(j*50+60);
            quad.setY(i*50+50);

            //根据练连连看信息设置动画场景
            quad.setScene("prop_"+(mapList[i][j]));

            //设置播放速度
            quad.setAnimationSpeed(60);

            //默认停止动画播放
            quad.stop();

            //创建一个动作代理类,里面可执行QUAD的独立动作
            var quadAction=new QuadAction(quad);

            //存放到动作列表
            quadActionList.push(quadAction);

            //保存这个动作代理类到QUAD,方便日后的访问
            quad.setUserData(quadAction);

            //创建一个帧事件,执行帧为动画的最后一帧
            frameFun.setFrame(quad.getTotalFrame());

            //设置帧事件回调函数
            frameFun.setCallBackFun(remove);

            //添加帧事件
            quad.addFrameScript(frameFun);

            //添加到网格列表显示
            mc.addQuad(quad);
        }

    }

    //创建粒子需要的网格显示对象,创建数量为100个,设置贴图,设置着色器
    var particle=new MovieClip2D(100,new Texture2D(circleImag),shader);

    //设置混色叠加
    particle.blend(System2D.prototype.gl.ONE_MINUS_SRC_ALPHA,System2D.prototype.gl.ONE);

    //把显示对象添加到场景上
    stage2d.addChild(particle);


    //粒子不是显示对象,所以只是代理而已,它共享上面的显示对象,2个粒子各占用50个
    grainsend_1=new GrainSend(particle,50);

    //默认关闭粒子
    grainsend_1.isPlay=false;

    grainsend_2=new GrainSend(particle,50);
    grainsend_2.isPlay=false;

}

function xmlLoad(e)
{
    var image=new Loader();
    image.load("Circle.png");
    image.getEvent2D().addEventListener(Event2D.prototype.COMPLETE,imageLoad)
    xmldata = e;

}

function resLoad(e)
{
    imgae=e;
    var xml=new Loader();
    xml.load("res.xml");
    xml.getEvent2D().addEventListener(Event2D.prototype.COMPLETE,xmlLoad)
}



function run(value)
{

    //如果路径不为空
    if(pathList!=null)
    {
        //时间++
        time++;

        //如果时间大于等于30则开始运动到路径的下一个节点
        if(time>=30)
        {
            //重置时间
            time=0;
            ids++;

            //如果运动节点等于路径的最后一个长度那么就等于最后一个长度,防止越界
            if(ids>=pathList.length-1)
            {
                ids=pathList.length-1;
            }
        }

        //让粒子缓动到路径点上,粒子1从到缓动到尾
        grainsend_1.y+=(pathList[ids][0]*50+50-grainsend_1.y)/10;
        grainsend_1.x+=(pathList[ids][1]*50+60-grainsend_1.x)/10;

        //同理.粒子2从尾缓懂到头
        grainsend_2.y+=(pathList[pathList.length-(ids+1)][0]*50+50-grainsend_2.y)/10;
        grainsend_2.x+=(pathList[pathList.length-(ids+1)][1]*50+60-grainsend_2.x)/10;

        //如果路径点等于最后了
        if(ids==pathList.length-1)
            if(Math.abs(grainsend_1.y-(pathList[ids][0]*50+50))<=5&&Math.abs(grainsend_1.x-(pathList[ids][1]*50+60))<=5)
            {
                //那么判断粒子的坐标是否与路径点小于5像素,如果是则认为粒子已经到达目的地,因为2个粒子运动轨迹是一样的,所以判断一个就可以,然后停止粒子的播放
                grainsend_1.isPlay=false;
                grainsend_2.isPlay=false;
            }
    }

    //运行2个粒子发射器,统一放在一个线程里
    grainsend_1.run();
    grainsend_2.run();

    //QUAD动作列表,统一放在一个线程里执行心跳逻辑
    for(var i=0;i<quadActionList.length;i++)
    {
        quadActionList[i].run();
    }


    //循环播放背景音乐
    try {   
        if(backgroundSound.currentTime==backgroundSound.duration)
        {
            backgroundSound.currentTime=0;
            backgroundSound.play();
        }
    }
    catch (e) {
        if(window.console && console.error("Error:" + e));
    }
        
    
}

//启动函数
function webGLStart() {

    //创建一个载入类
    var bitmaploader=new Loader();

    //资源地址
    bitmaploader.load("res.png");

    //侦听读取是否完毕
    bitmaploader.getEvent2D().addEventListener(Event2D.prototype.COMPLETE,resLoad)
}