/******************************************************************分割线***************************************************************************/
/**
 * 鼠标事件对象
 */
function MouseEvent2D()
{



    var parent_targetQuad=null;
    var parent_Sprite2D=null;

    /**
     * 设置点击的Sprite2D对象
     */
    this.setTargetSprite2D=function(value)
    {
        parent_Sprite2D=value;
    }

    /**
     * 获取点击的的Sprite2D对象
     */
    this.getTargetSprite2D=function()
    {
        return parent_Sprite2D;
    }

    /**
     * 设置当前点击的Quad
     */
    this.setTargetQuad=function(value)
    {
        parent_targetQuad=value;
    }

    /**
     * 获取当前点击的Quad
     */
    this.getTargetQuad=function()
    {
        return parent_targetQuad;
    }
}

MouseEvent2D.prototype.MOUSE_DOWN = "MouseEvent2D::MOUSE_DOWN";
MouseEvent2D.prototype.MOUSE_UP = "MouseEvent2D::MOUSE_UP";
MouseEvent2D.prototype.MOUSE_MOVE = "MouseEvent2D::MOUSE_MOVE";


//WEBGL场景类
function Stage2D() {

    System2D.prototype.stage2D=this;
    //显示列表
    var displayerlist=[];

    //事件类
    var event2D=new EventDisplayer2D();

    //添加显示对象
    this.addChild=function(child)
    {
        displayerlist.push(child);
    }

    //删除显示对象
    this.removeChild=function(child)
    {
        displayerlist.splice(displayerlist.index(child),1)
    }
    document.onmouseup = systemMouseUp;
    document.onmousedown = systemMouseDown;
    document.onmousemove = systemMouseMove;

    function isMouseEvent(type,e)
    {
        Mouse2D.prototype.mouseX=e.pageX;
        Mouse2D.prototype.mouseY=e.pageY;
        var mouseEvent2D=new MouseEvent2D();
        for(var i=displayerlist.length-1;i>=0;i--)
        {
            if(displayerlist[i].isClick(type,e.pageX, e.pageY,mouseEvent2D))
            {
                event2D.dispatchEvent(type,mouseEvent2D);
                return;
            }
        }
    }

    function systemMouseUp (e) {
        isMouseEvent(MouseEvent2D.prototype.MOUSE_UP,e);
    }

    function systemMouseDown (e) {
        isMouseEvent(MouseEvent2D.prototype.MOUSE_DOWN,e);
    }

    function systemMouseMove (e) {

        isMouseEvent(MouseEvent2D.prototype.MOUSE_MOVE,e);
    }
    var tt=new Date().getTime();
    //渲染函数,这里是循环调用的
   onDrawFrame=function() {
        //tt=new Date().getTime();
        event2D.dispatchEvent(Event2D.prototype.EVENT_FRAME,Event2D);
       System2D.prototype.gl.clear(System2D.prototype.gl.COLOR_BUFFER_BIT);
        //设置画布颜色为黑色
        System2D.prototype.gl.clearColor(1,1,1,1);
        //清理画布使用颜色缓存和深度缓存,虽然深度缓存,虽然现在没什么用为了以后扩展先留着吧,如果你不了解缓存,那么其实可以
        //理解为,把设置好的颜色从某个神秘区域提取出来提交给画布


       //GL10.GL_COLOR_BUFFER_BIT|GL10.GL_DEPTH_BUFFER_BIT
        for(var i=0;i<displayerlist.length;i++)
        {
            displayerlist[i].paint();
        }
        //alert(new Date().getTime()-tt)
        //循环调用
        window.requestAnimationFrame(onDrawFrame);
        //setTimeout(onDrawFrame);
    }


    //获得事件类
    this.getEvent2D=function()
    {
        return event2D;
    }

    //获取画布myWebGL是自定义名称
    System2D.prototype.canvas=document.getElementById("myWebGL");
    try {
        //获取WEBGL的句柄,这个骚气的名字ID不是我取的,你必须得用这个,我一开始也以为是自定义的
        System2D.prototype.gl = System2D.prototype.canvas.getContext("experimental-webgl");

        //System2D.prototype.gl.activeTexture(System2D.prototype.gl.ACTIVE_TEXTURE);
        //设置WEBGL的画布,坐标为0,0,宽度和高度最好和原始画布的一样
        System2D.prototype.gl.viewport(0, 0, System2D.prototype.canvas.width, System2D.prototype.canvas.height);
        System2D.prototype.gl.depthFunc(System2D.prototype.gl.LEQUAL);
        //System2D.prototype.gl.frontFace(System2D.prototype.gl.GL_CULL_FACE);
        System2D.prototype.gl.enable(System2D.prototype.gl.BLEND);
        System2D.prototype.gl.disable(System2D.prototype.gl.DEPTH_TEST);
        //System2D.prototype.gl.disable(System2D.prototype.gl.GL_CULL_FACE);


        //设置场景宽度
        System2D.prototype.stageWidth=System2D.prototype.canvas.width;

        //设置场景高度
        System2D.prototype.stageHeight=System2D.prototype.canvas.height;

        //设置比例
        System2D.prototype.ratio=System2D.prototype.stageWidth/System2D.prototype.stageHeight
        onDrawFrame();
    } catch (e) {

    }
    if (!System2D.prototype.gl) {
        //如果不支持,可以回滚到canvas的渲染机制
        alert("Could not initialise WebGL, sorry :-(");
    }
}
function Mouse2D()
{

}
Mouse2D.prototype.mouseX=0;
Mouse2D.prototype.mouseY=0;
/******************************************************************分割线***************************************************************************/

//全局系统
function System2D(){};

//游戏场景
System2D.prototype.stage2D=null;

//gl句柄
System2D.prototype.gl=null;

//画布句柄
System2D.prototype.canvas=null;

//场景宽度
System2D.prototype.stageWidth=0;

//场景高度
System2D.prototype.stageHeight=0;

//场景比例
System2D.prototype.ratio=1;

//场景正交矩阵
System2D.prototype.oRMatrixList=[];




/******************************************************************分割线***************************************************************************/

//系统基础事件
function Event2D(){};

//初始化事件
Event2D.prototype.INITIALIZE = "Event2D::INITIALIZE";

//帧事件
Event2D.prototype.EVENT_FRAME = "Event2D::EVENT_FRAME";

//资源载入完毕
Event2D.prototype.COMPLETE = "Event2D::COMPLETE";


/******************************************************************分割线***************************************************************************/


//函数存储类
function Function2D(v_type,v_fun)
{
    var private_type=v_type;
    var private_fun=v_fun;

    //设置事件类型
    this.setType=function(value)
    {
        private_type=value;
    }

    //获取事件类型
    this.getType=function()
    {
        return private_type;
    }

    //设置回调函数
    this.setFun=function(value)
    {
        private_fun=value;
    }

    //获取回调函数
    this.getFun=function()
    {
        return private_fun;
    }
}

/******************************************************************分割线***************************************************************************/
//事件类
function EventDisplayer2D()
{
    //回调函数列表
    var private_eventFunList=[];

    //添加侦听器
    this.addEventListener=function(type,fun)
    {
        var function2D=new Function2D(type,fun);
        private_eventFunList.push(function2D);
    }

    //删除侦听器
    this.removeEventListener=function(type,fun)
    {
        for(var i=0;i<private_eventFunList.length;i++)
        {
            if(private_eventFunList[i].getType()==type&&private_eventFunList[i].getFun()==fun)
            {
                private_eventFunList.splice(i,1);
            }
        }
    }

    //调用函数
    this.dispatchEvent=function(type,value)
    {
        for(var i=0;i<private_eventFunList.length;i++)
        {


            if(private_eventFunList[i].getType()===type)
            {

                private_eventFunList[i].getFun()(value);
            }
        }
    }
}

/******************************************************************分割线***************************************************************************/

/**
 * 基础显示对象类,提供显示对象的基本的变换操作
 */
function DisplayerObject2D()
{

    this.mouseEnabled=true;

    /**
     * 设置是否启用鼠标检测
     * @param value
     */
    this.setMouseEnabled=function(value)
    {
        this.mouseEnabled=value;
    }

    /**
     * 获取鼠标检测状态
     * @return {*}
     */
    this.getMouseEnabled=function()
    {
        return this.mouseEnabled;
    }

    this.userData=null;

    /**
     * 设置用户零时存储数据
     * @param value
     */
    this.setUserData=function(value)
    {
        this.userData=value;
    }

    /**
     * 获得用户零时存储数据
     * @return {*}
     */
    this.getUserData=function()
    {
        return this.userData;
    }
    //私有属性约定private_开头
    this.private_x=0;
    this.private_y=0;
    this.private_rotation=0;
    this.private_width=1;
    this.private_height=1;
    this.private_scaleX=1;
    this.private_scaleY=1;
    this.private_biasX=0;
    this.private_biasY=0;
    this.private_pivotX=0;
    this.private_pivotY=0

    this.private_r=1;
    this.private_g=1;
    this.private_b=1;
    this.private_a=1;
    this.private_alpha=1;

    this.private_visible=true;

    this.private_isRedraw=true;

    //父对象
    this.private_parent=null;

    //设置父对象
    this.setParent=function(value)
    {
        this.private_parent=value;
    }

    //获得父对象
    this.getParent=function()
    {
        return  this.private_parent
    }

    //设置显示对象是否显示
    this.setVisible=function(value)
    {
        this.private_visible=value;
        this.private_isRedraw=true;
    }

    //获取显示对象显示状态
    this.getVisible=function()
    {
        return this.private_visible;
    }

    //设置显示对象的红色通道
    this.setR=function(value)
    {
        this.private_r=value;
        this.private_isRedraw=true;
    }

    //获得显示对象的红色通道
    this.getR=function(value)
    {
        return this.private_r;
    }

    //设置显示对象的绿色通道
    this.setG=function(value)
    {
        this.private_g=value;
        this.private_isRedraw=true;
    }

    //获取显示对象的绿色通道
    this.getG=function(value)
    {
        return this.private_g;
    }


    //设置显示对象的蓝色通道
    this.setB=function(value)
    {
        this.private_b=value;
        this.private_isRedraw=true;
    }

    //获取显示对象的蓝色通道
    this.getB=function(value)
    {
        return this.private_b;
    }


    //设置显示对象的像素透明通道
    this.setA=function(value)
    {
        this.private_a=value;
        this.private_isRedraw=true;
    }

    //获得显示对象的像素透明通道
    this.getA=function(value)
    {
        return this.private_a;
    }

    //设置显示对象的透明度
    this.setAlpha=function(value)
    {
        this.private_alpha=value;
        this.private_isRedraw=true;
    }

    //获得显示对象的透明度
    this.getAlpha=function(value)
    {
        return this.private_alpha;
    }

    /**
     * 设置显示对象的Y轴原点偏移量
     */
    this.setPivotY=function(value)
    {
        this.private_pivotY=value;
        this.private_isRedraw=true;
    }

    /**
     * 获取显示对象的Y轴原点偏移量
     */
    this.getPivotY=function()
    {
        return this.private_pivotY;
    }


    /**
     * 设置显示对象的X轴原点偏移量
     */
    this.setPivotX=function(value)
    {
        this.private_pivotX=value;
        this.private_isRedraw=true;
    }

    /**
     * 获取显示对象的X轴原点偏移量
     */
    this.getPivotX=function()
    {
        return this.private_pivotX;
    }


    /**
     * 设置显示对象的Y轴倾斜度
     */
    this.setBiasY=function(value)
    {
        this.private_biasY=value;
        this.private_isRedraw=true;
    }

    /**
     * 获取显示对象的Y轴倾斜度
     */
    this.getBiasY=function()
    {
        return this.private_biasY;
    }


    /**
     * 设置显示对象的X轴倾斜度
     */
    this.setBiasX=function(value)
    {
        this.private_biasX=value;
        this.private_isRedraw=true;
    }

    /**
     * 获取显示对象的X轴倾斜度
     */
    this.getBiasX=function()
    {
        return this.private_biasX;
    }

    /**
     * 设置显示对象的X轴坐标的值
     */
    this.setX=function(value)
    {
        this.private_x=value;
        this.private_isRedraw=true;
    }

    /**
     * 获取显示对象的X轴坐标的值
     */
    this.getX=function(value)
    {
        return this.private_x;
    }

    /**
     * 设置显示对象的Y轴坐标的值
     */
    this.setY=function(value)
    {
        this.private_y=value;
        this.private_isRedraw=true;
    }

    /**
     * 获取显示对象的Y轴坐标的值
     */
    this.getY=function()
    {
        return this.private_y;
    }

    /**
     * 设置显示对象的角度值
     */
    this.setRotation=function(value)
    {
        this.private_rotation=value;
        this.private_isRedraw=true;
    }

    /**
     * 获取显示对象的角度值
     */
    this.getRotation=function()
    {
        return this.private_rotation;
    }

    /**
     * 设置显示对象的X轴比例
     */
    this.setScaleX=function(value)
    {
        this.private_scaleX=value;
        this.private_isRedraw=true;
    }

    /**
     * 获取显示对象的X轴比例
     */
    this.getScaleX=function(value)
    {
        return this.private_scaleX;
    }

    /**
     * 设置显示对象的Y轴比例
     */
    this.setScaleY=function(value)
    {
        this.private_scaleY=value;
        this.private_isRedraw=true;
    }

    /**
     * 获取显示对象的Y轴比例
     */
    this.getScaleY=function(value)
    {
        return this.private_scaleY;
    }
}

//模拟继承,设置QUAD的原型为DisplayerObject2D,它能提供基础变换
Quad.prototype = new DisplayerObject2D();

/******************************************************************分割线***************************************************************************/

//获取着色器
function getShader(gl, id) {

    //这里是一系列的JS解析过程,实际上你不这么做直接上传字符串也可以
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {

        //根据参数定义不同的着色器类型,这里定义的是像素着色器类型
        shader = System2D.prototype.gl.createShader(System2D.prototype.gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {

        //这里定义的是一个顶点着色器类型
        shader = System2D.prototype.gl.createShader(System2D.prototype.gl.VERTEX_SHADER);
    } else {
        return null;
    }

    //绑定着色器字符串到到着色器里
    System2D.prototype.gl.shaderSource(shader, str);

    //编译这个着色器,就是生成这段程序
    System2D.prototype.gl.compileShader(shader);

    //如果创建不成功,那就是你写错代码了
    if (!System2D.prototype.gl.getShaderParameter(shader, System2D.prototype.gl.COMPILE_STATUS)) {
        alert(System2D.prototype.gl.getShaderInfoLog(shader));
        return null;
    }

    //最后返回出这个着色器
    return shader;
}

/******************************************************************分割线***************************************************************************/


//点与矩形,矩形的坐标点在图像的中心位置时
function hitTestPoint(point,rectangle)
{
    //获取点与图像中心点X的距离的绝对值
    var distanceX=Math.abs(rectangle.x-point.x);

    //获取点与图像中心点Y的距离的绝对值
    var distanceY=Math.abs(rectangle.y-point.y);

    //判断两个绝对值是是否小于图像的一半,是则点在图像的范围之内
    if(distanceX<=rectangle.width/2&&distanceY<=rectangle.height/2)
    {
        return true;
    }
    return false
}

//矩形与矩形的碰撞
function hitTestRectangle(rectangleA,rectangleB)
{
    //获取2个矩形之前的中心点距离
    var distanceX=Math.abs(rectangleA.x-rectangleB.x);
    var distanceY=Math.abs(rectangleA.y-rectangleB.y);

    //判断距离是否在2个矩形宽度和高度的一半之内,如果是则2个矩形相交
    if(distanceX<=rectangleA.width/2+rectangleB.width/2&&distanceY<=rectangleA.height/2+rectangleB.height/2)
    {
        return true;
    }
    return false
}

//矩形与矩形的碰撞
function hitTestRoundness(point,roundness)
{
    //利用勾股定律获得点与圆心中心点的距离
    var distanceX=Math.abs(point.x-roundness.x);
    var distanceY=Math.abs(point.y-roundness.y);
    var distanceZ=Math.sqrt(distanceX*distanceX+distanceY*distanceY)

    //判断这个距离是否小于圆的半径,是则在圆形范围之内
    if(distanceZ<=roundness.radius)
    {
        return true;
    }
    return false
}


//面积检测算法
function hitTrianglePoint(p1,p2,p3)
{
    if ((p2.x-p1.x)*(p2.y+p1.y)+(p3.x-p2.x)*(p3.y+p2.y)+(p1.x-p3.x)*(p1.y+p3.y)<0)
    {
        return 1;
    }
    else
    {
        return 0;
    }
    return 0;
}


/**
 * 顶点碰撞检测
 * p1,p2,p3 为范围点
 * p4是碰撞点。
 */
 function hitPoint(p1,p2,p3,p4)
{
    var a = hitTrianglePoint(p1,p2,p3);
    var b = hitTrianglePoint(p4,p2,p3);
    var c = hitTrianglePoint(p1,p2,p4);
    var d = hitTrianglePoint(p1,p4,p3);
    if ((b==a)&&(c==a)&&(d==a))
    {
        return true;
    }
    else
    {
        return false;
    }
}
/**
 * 正交视口模型矩阵
 * @param m 正交的一维数组
 * @param left 左边界
 * @param right 右边界
 * @param bottom 底边界
 * @param top 上边界
 * @param near 近截面
 * @param far 远截面
 */
function orthoM(m,left,right,bottom,top,near,far)
{
    m[0] = 2.0*1.0/(right - left);
    m[5] = 2.0*1.0/(top - bottom);
    m[10] = 1.0/(far - near);

    m[12] = (right + left)/(right - left);
    m[13] = (bottom + top)/(bottom - top);
    m[14] = near/(near - far);

    m[1] = m[2] = m[3] = m[4] =m[6] = m[7] = m[8] = m[9] = m[11] = 0;
    m[15] = 1.0;
}


/**
 * 矩阵类,矩阵的计算是你的引擎里面消耗最多的地方,所以也是重点优化的地方,矩阵优化得好对因的引擎效率提升非常大,现在我们使
 * 用的矩阵类是完全原始未优化的,它与优化后的效率相差非常之大,不过这个我会放在后面的优化篇讲解,为了不使你混乱,目前可以
 * 不用关注,只需要关注原理就好
 */
function Matrix2D(){
    //矩阵的原始信息
    this.rawData=[];
    //矩阵的旋转存储信息
    this.spinArray=[];
    //矩阵的位移缩放倾斜存储信息
    this.translationArray=[];

    /**
     * 重置矩阵
     */
    this.identity=function()
    {
        this.translationArray = [];
        this.spinArray = [];
        this.rawData = [];
    }

    /**
     * 3*3矩阵融合
     */
    this.add33=function(v1,v2)
    {
        var m33 = [];
        m33[0]=v1[0]*v2[0]+v1[1]*v2[3]+v1[2]*v2[6];
        m33[1]=v1[0]*v2[1]+v1[1]*v2[4]+v1[2]*v2[7];
        m33[2]=v1[0]*v2[2]+v1[1]*v2[5]+v1[2]*v2[8];


        m33[3]=v1[3]*v2[0]+v1[4]*v2[3]+v1[5]*v2[6];
        m33[4]=v1[3]*v2[1]+v1[4]*v2[4]+v1[5]*v2[7];
        m33[5]=v1[3]*v2[2]+v1[4]*v2[5]+v1[5]*v2[8];

        m33[6]=v1[6]*v2[0]+v1[7]*v2[3]+v1[8]*v2[6];
        m33[7]=v1[6]*v2[1]+v1[7]*v2[4]+v1[8]*v2[7];
        m33[8]=v1[6]*v2[2]+v1[7]*v2[5]+v1[8]*v2[8];
        return m33;
    }

    /**
     * 1*3矩阵融合
     */
    this.add13=function(v1,v2)
    {
        var m13 = [];
        m13[0]=v1[0]*v2[0]+v1[1]*v2[3]+v1[2]*v2[6];
        m13[1]=v1[0]*v2[1]+v1[1]*v2[4]+v1[2]*v2[7];
        m13[2]=v1[0]*v2[2]+v1[1]*v2[5]+v1[2]*v2[8];
        return m13;
    }

    /*
     *旋转
     */
    this.appendRotation=function(rotation)
    {
        var cos = Math.cos(rotation * Math.PI / 180);
        var sin = Math.sin(rotation * Math.PI / 180);
        //旋转
        this.spinArray[0]=cos;
        this.spinArray[1]=sin;
        this.spinArray[2]=0;
        this.spinArray[3]=-sin;
        this.spinArray[4]=cos;
        this.spinArray[5]=0;
        this.spinArray[6]=0;
        this.spinArray[7]=0;
        this.spinArray[8]=1;
    }

    //平移,缩放,倾斜
    this.appendTranslation=function(x,y,scaleX,scaleY,biasX,biasY)
    {
        this.translationArray[0]=scaleX;
        this.translationArray[1]=biasY;
        this.translationArray[2]=0;
        this.translationArray[3]=biasX;
        this.translationArray[4]=scaleY;
        this.translationArray[5]=0;
        this.translationArray[6]=x;
        this.translationArray[7]=y;
        this.translationArray[8] = 1;
    };

    /**
     * 更新矩阵信息
     */
    this.upDataBasrMatrix=function(rotation,x,y,scaleX,scaleY,biasX,biasY)
    {
        //计算旋转后的矩阵
        this.appendRotation(rotation);

        //计算位移等其他变换后的矩阵
        this.appendTranslation(x,y,scaleX,scaleY,biasX,biasY);

        //融合这2个变换矩阵
        this.rawData = this.add33(this.spinArray,this.translationArray);
    }

}

/**
 * 矩阵代理面板类,我们会把顶点push到这个面板类里,从而对这个面板实现顶点的变换操作
 */
function Panel()
{
    /**
     * 属性集合
     */
    this.mX = 0;
    this.mY= 0;
    this.mRotation = 0;
    this.mScaleX = 1;
    this.mScaleY = 1;
    this.mBiasX = 0;
    this.mBiasY = 0;
    this.mPivotX = 0;
    this.mPivotY = 0;

    //矩阵
    this.matrix2D=new Matrix2D();

    //元素列表
    this.itemList=[];

    //元素信息列表
    this.itemData=[];

    //原始元素信息列表
    this.itemDataAgency=[];

    //这个属性用于存放最终计算的出来的点,也就是屏幕上最终的坐标,[0]代表X,[1]代表Y,实际上这可以是一个对象
    this.point=[];

    //记录当前面板中有多少个点对象
    this.ids=0;

    /**
     * 获取矩阵信息
     */
    this.getMatrix2D=function()
    {
        return this.matrix2D;
    }

    /**
     * 设置矩阵信息
     */
    this.setMatrix2D=function(matrix2D)
    {
       this.matrix2D = matrix2D;
    }


    /**
     * 更新顶点缓存信息
     */
    this.upDataFrame=function(p)
    {
        this.itemData[this.ids]=new Point2D();
        this.itemData[this.ids].setX(p.getX());
        this.itemData[this.ids].setY(p.getY());

        this.itemDataAgency[this.ids]=new Point2D();
        this.itemDataAgency[this.ids].setX(p.getX());
        this.itemDataAgency[this.ids].setY(p.getY());
    }

    /**
     * 获得点数据
     */
    this.setPoint=function(value,point)
    {
        this.itemData[value]=point;
    }

    /**
     * 设置点数据
     */
    this.getPoint=function(value)
    {
        return this.itemData[value];
    }

    /**
     * 更新矩阵操作
     */
    this.upDataRaw=function()
    {
        for (var i = 0; i <this.ids; i++)
        {
            //零时缓存顶点的信息,实际上这一步在后期的优化中可以省略掉，毕竟每次做这样的操作还是很消耗的
            var cacheList=[];
            cacheList[0]=this.itemDataAgency[i].getX();
            cacheList[1]=this.itemDataAgency[i].getY();
            cacheList[2]=1;

            //存储1*3的矩阵计算后结果,也就是实际计算出来的屏幕坐标
            var point = this.matrix2D.add13(cacheList,this.matrix2D.rawData);

            //改变缓存里的顶点的坐标信息
            this.itemList[i].setX(point[0]);
            this.itemList[i].setY(point[1]);
        }
    }

    /**
     * 更新矩阵操作
     */
    this.upDataMatrix=function()
    {
        //根据输入的信息更新矩阵
        this.matrix2D.upDataBasrMatrix(this.mRotation,this.mX + this.mPivotX, this.mY + this.mPivotY, this.mScaleX,this.mScaleY, this.mBiasX, this.mBiasY);
        //然后更新顶点信息
        this.upDataRaw();
    }


    /**
     * 更新顶点的原始顶点坐标
     */
    this.upDataMatrixData=function(pivotX,pivotY,scaleX,scaleY,biasX,biasY)
    {
        this.matrix2D.upDataBasrMatrix(0,pivotX,pivotY, scaleX, scaleY, biasX, biasY);
        for (var i = 0; i <this.ids; i++)
        {
            var cacheList=[];
            cacheList[0]=this.itemData[i].getX();
            cacheList[1]=this.itemData[i].getY();
            cacheList[2]=1;
            var point = this.matrix2D.add13(cacheList,this.matrix2D.rawData);
            this.itemDataAgency[i].setX(point[0]);
            this.itemDataAgency[i].setY(point[1]);
        }
    }


    /**
     * 添加元素
     */
    this.addItem=function(obj)
    {
        this.itemList[this.ids]=obj;
        this.upDataFrame(obj);
        this.ids++;
    }




    /**
     * 更改或读取面板X坐标
     */
    this.getX=function(){return this.mX;};
    this.setX=function(value)
    {
        this.mX = value;
    }

    /**
     * 更改或读取面板Y坐标
     */
    this.getY=function() {return this.mY;};
    this.setY=function(value)
    {
         this.mY = value;
    }


    /**
     * 更改或读取面板角度
     */
    this.getRotation=function(){return this.mRotation;};
    this.setRotation=function(value)
    {
         this.mRotation = value;
    }

    /**
     * 更改或读取面板X比例
     */
    this.getScaleX=function() {return this.mScaleX;};
    this.setScaleX=function(value)
    {
        this.mScaleX = value;
    }

    /**
     * 更改或读取面板Y比例
     */
    this.getScaleY=function(){return this.mScaleY;};
    this.setScaleY=function(value)
    {
        this.mScaleY = value;
    }

    /**
     * 更改或读取面板X倾斜度
     */
    this.getBiasX=function() {return this.mBiasX;};
    this.setBiasX=function(value)
    {
        this.mBiasX = value;
    }

    /**
     * 更改或读取面板Y倾斜度
     */
    this.getBiasY=function(){return this.mBiasY;};
    this.setBiasY=function(value)
    {
        this.mBiasY = value;
    }

    /**
     * 更改或读取面板X偏移值
     */
    this.getPivotY=function() {return this.mPivotY;};
    this.setPivotY=function(value)
    {
        this.mPivotY = value;
    }

    /**
     * 更改或读取面板Y偏移值
     */
    this.getPivotX=function(){return this.mPivotX;};
    this.setPivotX=function(value)
    {
        this.mPivotX = value;
    }
}

/**
 * 2D点对象
 *
 */
function Point2D(x,y){

    this.mX=x;
    this.mY=y;

    this.getX=function() {
        return this.mX;
    }
    this.setX=function(value) {
        this.mX = value;
    }
    this.getY=function() {
        return this.mY;
    }
    this.setY=function(value) {
        this.mY = value;
    }
}
/**
 * 帧函数
 */
function FrameFunction()
{
    var frame;
    var callBackFun;

    /**
     * 设置帧序号
     * @param value
     */
    this.setFrame=function(value)
    {
        frame=value;
    }

    /**
     * 获取帧序号
     * @return {*}
     */
    this.getFrame=function()
    {
        return frame;
    }

    /**
     * 设置帧回调函数
     * @param value
     */
    this.setCallBackFun=function(value)
    {
        callBackFun=value;
    }

    /**
     * 获得帧回调函数
     * @return {*}
     */
    this.getCallBackFun=function()
    {
        return callBackFun;
    }
}
/**
 * 影片剪辑,现在升级成批处理容器
 */
function MovieClip2D(v_max,v_texture,v_shader,v_data)
{

    var event2D=new EventDisplayer2D();
    //获得事件类
    this.getEvent2D=function()
    {
        return event2D;
    }
    //批处理的对象池
    var private_quadList=[];

    //对象池最大数量
    var private_quadMax=v_max;

    //顶点索引数组
    var private_indexList=new Uint16Array(v_max*6);

    //顶点坐标数组
    var private_verticesList=new Float32Array(v_max*8);

    //UV坐标信息
    var private_uvList=new Float32Array(v_max*8);

    //顶点颜色信息
    var private_colourList=new Float32Array(v_max*16);

    //获取纹理
    var private_texture=v_texture;

    //获取着色器
    var private_shader=v_shader;


    //源颜色因子
    var private_sfactor=System2D.prototype.gl.ONE;

    //目标颜色因子
    var private_dfactor=System2D.prototype.gl.ONE_MINUS_SRC_ALPHA;


    //创建对象池元素
    for(var m=0;m<private_quadMax;m++)
    {
        private_quadList.push(new Quad(m,v_texture,private_verticesList,private_uvList,private_colourList,v_data));
    }

    /**
     * 检测是否点击
     */
    this.isClick=function(type,x,y,e)
    {
        for(var i=private_quadList.length-1;i>=0;i--)
        {
           if(private_quadList[i].getMouseEnabled()&&private_quadList[i].getParent()!=null&&private_quadList[i].getVisible())
           {

               var pw=(private_quadList[i].getVertex(3).getX()-private_quadList[i].getVertex(0).getX())/2;
               var ph=(private_quadList[i].getVertex(3).getY()-private_quadList[i].getVertex(0).getY())/2;
               var px=private_quadList[i].getVertex(0).getX()+pw;
               var py=private_quadList[i].getVertex(0).getY()+ph;
               if(private_quadList[i].getWidth()!=0&&private_quadList[i].getHeight()!=0)
               {

                   if(Math.abs(x-px)<=pw&&Math.abs(y-py)<=ph)
                   {

                       //private_quadList[i].setAlpha(.5);
                       e.setTargetSprite2D(this);
                       e.setTargetQuad(private_quadList[i]);
                       event2D.dispatchEvent(type,e);
                       private_quadList[i].getEvent2D().dispatchEvent(type,e);

                       return true;
                   }
               }


           }
        }
        return false;
    }
    /**
     * 添加显示对象
     */
    this.addQuad=function(child)
    {
        child.setParent(this);
    }

    /**
     * 移除显示对象
     */
    this.removeQuad=function(child)
    {
        child.setParent(null);
    }




    //设置混色参数
    this.blend=function(src,dst)
    {
        private_sfactor=src;
        private_dfactor=dst
    }


    //获得QUAD
    this.getQuad=function()
    {
        for(var i=0;i<private_quadList.length;i++)
        {
            if(!private_quadList[i].getIsStart())
            {
                private_quadList[i].launch();
                return private_quadList[i];
            }
        }
        return null;
    }

    /**********************************************初始化顶点颜色信息*******************************************/
    this.verticesColourBuffer = System2D.prototype.gl.createBuffer();


    /**********************************************初始化顶点坐标信息*******************************************/
   //先从GL申请一个缓存数组
    this.vertexPositionBuffer = System2D.prototype.gl.createBuffer();

    /**********************************************初始化UV信息*******************************************/

        //上传这个顶点数据到WEBGL的状态机里,这里有点难理解,WBEGL是过程式的,因为我们上面的操作是已经上传了顶点的缓存数
        // 组到状态机通过使用参数gl.STATIC_DRAW,告诉告诉状态机,现在上传的是这个缓存数组里的具体参数,参数是浮点数
    //申请一个UV的缓存数组
    this.vertexTextureUvdBuffer = System2D.prototype.gl.createBuffer();

    /**********************************************初始化顶点索引*******************************************/

    //申请一个顶点索引的缓存数组
    this.vertexIndexBuffer = System2D.prototype.gl.createBuffer();

    //上传到WEBGL的状态机里
    System2D.prototype.gl.bindBuffer(System2D.prototype.gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);

    //设置顶点绘制的循序,WBEGL会根据你的这个循序去渲染你的图像,通常你可以利用这里改变你的图像的排序循序,这里渲染的是
    //两个三角形,因为我们是做2D,两个三角形是有两个共享点的

    //根据对象数量创建顶点
    for(var v=0;v<private_quadMax;v++)
    {
        private_indexList[v+v*5+0]=0+v*4;
        private_indexList[v+v*5+1]=1+v*4;
        private_indexList[v+v*5+2]=2+v*4;
        private_indexList[v+v*5+3]=0+v*4;
        private_indexList[v+v*5+4]=2+v*4;
        private_indexList[v+v*5+5]=3+v*4
    }
    //这里的上传类型改变为长整形了,Uint16Array,这里是一个坑,在其他语言里你上传错误的数据类型不会报错,但是会显示很奇怪,
    //以前我就被这个坑了一个下午,因为索引ID没有小数
    System2D.prototype.gl.bufferData(System2D.prototype.gl.ELEMENT_ARRAY_BUFFER, private_indexList, System2D.prototype.gl.STATIC_DRAW);


    var bool=false;
    var sh;
    var or;
    sh=System2D.prototype.gl.getUniformLocation(private_shader.shaderProgram,"uSampler");
    or=System2D.prototype.gl.getUniformLocation(private_shader.shaderProgram, "oRMatrix")

    this.paint=function()
    {
        //混色
        System2D.prototype.gl.blendFunc(private_sfactor,private_dfactor);
        //开始渲染批处理对象

        for(var i=0;i<private_quadMax;i++)
        {
            private_quadList[i].paint();
        }
        //计算正交视口矩阵
        orthoM(System2D.prototype.oRMatrixList,-System2D.prototype.ratio-System2D.prototype.ratio,System2D.prototype.ratio-System2D.prototype.ratio,2,0, 0, 1);

            System2D.prototype.gl.uniform1f(System2D.prototype.gl.getUniformLocation(private_shader.shaderProgram,"time"),this.index);


            System2D.prototype.gl.activeTexture(System2D.prototype.gl.TEXTURE0);
            System2D.prototype.gl.bindTexture(System2D.prototype.gl.TEXTURE_2D,private_texture.newTexture);
            System2D.prototype.gl.uniform1i(System2D.prototype.gl.getUniformLocation(private_shader.shaderProgram,"p_1"),0);





            //推送顶点坐标缓存到WEBGL状态机
            System2D.prototype.gl.bindBuffer(System2D.prototype.gl.ARRAY_BUFFER, this.vertexPositionBuffer);
            //上传顶点坐标数据到顶点缓存
            System2D.prototype.gl.bufferData(System2D.prototype.gl.ARRAY_BUFFER, private_verticesList, System2D.prototype.gl.STREAM_DRAW);


            //推送UV缓存到WEBGL状态机
            System2D.prototype.gl.bindBuffer(System2D.prototype.gl.ARRAY_BUFFER, this.vertexTextureUvdBuffer);
            //上传顶点UV数据到顶点缓存
            System2D.prototype.gl.bufferData(System2D.prototype.gl.ARRAY_BUFFER, private_uvList, System2D.prototype.gl.STREAM_DRAW);


            //推送颜色缓存到WEBGL状态机
            System2D.prototype.gl.bindBuffer(System2D.prototype.gl.ARRAY_BUFFER, this.verticesColourBuffer);
            //上传顶点颜色数据到顶点缓存
            System2D.prototype.gl.bufferData(System2D.prototype.gl.ARRAY_BUFFER, private_colourList, System2D.prototype.gl.STREAM_DRAW);



            //上传顶点坐标数据的缓存到着色器
            System2D.prototype.gl.bindBuffer(System2D.prototype.gl.ARRAY_BUFFER,this.vertexPositionBuffer);
            //第一个参数为绑定的寄存器,每个顶点的数据长度为2,浮点型,它会自动帮我们区分,然后是不启用法线辅助功能,间隔为0
            System2D.prototype.gl.vertexAttribPointer(private_shader.shaderProgram.vertexPositionAttribute,2, System2D.prototype.gl.FLOAT, false, 0, 0);


            //推送UV信息到WEBGL状态机
            System2D.prototype.gl.bindBuffer(System2D.prototype.gl.ARRAY_BUFFER, this.vertexTextureUvdBuffer);
            //上传顶点UV数据的缓存到着色器
            System2D.prototype.gl.vertexAttribPointer(private_shader.shaderProgram.textureCoordAttribute,2, System2D.prototype.gl.FLOAT, false, 0, 0);

            //推送颜色信息到WEBGL状态机
            System2D.prototype.gl.bindBuffer(System2D.prototype.gl.ARRAY_BUFFER,this.verticesColourBuffer);
            //上传顶点颜色数据的缓存到着色器
            System2D.prototype.gl.vertexAttribPointer(private_shader.shaderProgram.verticesColourAttribute,4, System2D.prototype.gl.FLOAT, false, 0, 0);


        //上传顶点坐标数据的缓存到着色器
        System2D.prototype.gl.bindBuffer(System2D.prototype.gl.ARRAY_BUFFER,this.vertexPositionBuffer);
        //第一个参数为绑定的寄存器,每个顶点的数据长度为2,浮点型,它会自动帮我们区分,然后是不启用法线辅助功能,间隔为0
        System2D.prototype.gl.vertexAttribPointer(private_shader.shaderProgram.vertexPositionAttribute,2, System2D.prototype.gl.FLOAT, false, 0, 0);


       //推送UV信息到WEBGL状态机
        System2D.prototype.gl.bindBuffer(System2D.prototype.gl.ARRAY_BUFFER, this.vertexTextureUvdBuffer);
        //上传顶点UV数据的缓存到着色器
        System2D.prototype.gl.vertexAttribPointer(private_shader.shaderProgram.textureCoordAttribute,2, System2D.prototype.gl.FLOAT, false, 0, 0);


        //推送颜色信息到WEBGL状态机
        System2D.prototype.gl.bindBuffer(System2D.prototype.gl.ARRAY_BUFFER,this.verticesColourBuffer);
        //上传顶点颜色数据的缓存到着色器
        System2D.prototype.gl.vertexAttribPointer(private_shader.shaderProgram.verticesColourAttribute,4, System2D.prototype.gl.FLOAT, false, 0, 0);




        //上传正交矩阵到着色器,不需要归一化
        System2D.prototype.gl.uniformMatrix4fv(or,false,System2D.prototype.oRMatrixList);

        //推动顶点索引数据到WBEGL状态机
        System2D.prototype.gl.bindBuffer(System2D.prototype.gl.ELEMENT_ARRAY_BUFFER,this.vertexIndexBuffer);
        //上传顶点索引数据并且开始绘制,绘制类型为三角形,长度,类型为短整形,间隔为0
        System2D.prototype.gl.drawElements(System2D.prototype.gl.TRIANGLES,6*private_quadMax, System2D.prototype.gl.UNSIGNED_SHORT, 0);
    }

}


/**
 * 着色器
 */
function Shader()
{
    //创建一个着色器程序
    this.shaderProgram = System2D.prototype.gl.createProgram();

    //获取顶点着色器
    var vertexShader = getShader(System2D.prototype.gl, "shader-vs");

    //获取像素着色器
    var fragmentShader = getShader(System2D.prototype.gl, "shader-fs");


    //把顶点着色器上传到这个着色器程序里
    System2D.prototype.gl.attachShader(this.shaderProgram, vertexShader);

    //把像素着色器上传到这个着色器程序里
    System2D.prototype.gl.attachShader(this.shaderProgram, fragmentShader);

    //链接这个着色器
    System2D.prototype.gl.linkProgram(this.shaderProgram);

    //如果你创建失败了,那你又写错代码了
    if (!System2D.prototype.gl.getProgramParameter(this.shaderProgram, System2D.prototype.gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    //把这个着色器上传到GPU
    System2D.prototype.gl.useProgram(this.shaderProgram);

    //还记得aVertexPosition个寄存器的名称么,这是对应到顶点着色器的,getAttribLocation这句话的意思是,从这个着色器程序里
    //获得一个叫aVertexPosition的寄存器名称,然后赋值给shaderProgram.vertexPositionAttribute
    this.shaderProgram.vertexPositionAttribute = System2D.prototype.gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
    //绑定这个寄存器属性
    System2D.prototype.gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);

    //原理同上,名称要一一对应
    this.shaderProgram.textureCoordAttribute = System2D.prototype.gl.getAttribLocation(this.shaderProgram, "aTextureUv");
    System2D.prototype.gl.enableVertexAttribArray(this.shaderProgram.textureCoordAttribute);

    //绑定顶点颜色着色器寄存器
    this.shaderProgram.verticesColourAttribute = System2D.prototype.gl.getAttribLocation(this.shaderProgram, "verticesColor");
    System2D.prototype.gl.enableVertexAttribArray(this.shaderProgram.verticesColourAttribute);
}

/**
 * 2D纹理对象
 */
function Texture2D(v_image,v_xml)
{
    var quadResource=null;

    this.loadXml=function(results)
    {
        quadResource=new QuadResource();
        var name;
        var textureAtlas = results.getElementsByTagName("SubTexture");
        var quadDataList=[];
        var quadFrameList=[];
        for (var i = 0; i< textureAtlas.length; i++){
            var subTexture =  textureAtlas[i];
            if(name!=subTexture.getAttribute("name").substr(0,subTexture.getAttribute("name").length-4))
            {
                quadFrameList=[];
                var quadData=new QuadData();
                quadData.name=subTexture.getAttribute("name").substr(0,subTexture.getAttribute("name").length-4);
                quadData.quadFrameLst=quadFrameList;
                quadDataList.push(quadData);
            };



            var cacheframeWidth;
            var cacheframeHeight;
            var cacheWidth;
            var cacheHeight
            var quadFrame=new QuadFrame();
            quadFrame.name=subTexture.getAttribute("name");
            var replace=subTexture.getAttribute("x");
            if(replace!=null){
                quadFrame.x=replace;
            };

            replace=subTexture.getAttribute("y");
            if(replace!=null){
                quadFrame.y=replace;
            };

            replace=subTexture.getAttribute("width");
            if(replace!=null){
                quadFrame.width=replace;
                cacheWidth=replace;
            };

            replace=subTexture.getAttribute("height");
            if(replace!=null){
                quadFrame.height=replace;
                cacheHeight=replace;
            };

            replace=subTexture.getAttribute("frameX");
            if(replace!=null){
                quadFrame.frameX=subTexture.getAttribute("frameX");
            }else
            {
                quadFrame.frameX=0;
            }

            replace=subTexture.getAttribute("frameY");
            if(replace!=null){
                quadFrame.frameY=replace;
            }else{
                quadFrame.frameY=0;
            }

            replace=subTexture.getAttribute("frameWidth");
            if(replace!=null){
                quadFrame.frameWidth=replace;
                cacheframeWidth=replace;
            }else{
                if(cacheframeWidth!=null){
                    quadFrame.frameWidth=cacheframeWidth;
                }else{
                    quadFrame.frameWidth=cacheWidth;
                }
            }

            replace=subTexture.getAttribute("frameHeight");
            if(replace!=null){
                quadFrame.frameHeight=replace;
                cacheframeHeight=replace;
            }else
            {
                if(cacheframeHeight!=null){
                    quadFrame.frameHeight=cacheframeHeight;
                }else{
                    quadFrame.frameHeight=cacheHeight;
                }
            }
            name=subTexture.getAttribute("name").substr(0,subTexture.getAttribute("name").length-4);
            quadFrameList.push(quadFrame);
        }

        quadResource.setQuadDataList(quadDataList);
    };

    //获得动画信息
    this.getQuadResource=function()
    {
        return quadResource;
    }
    if(v_xml!=null)
    {
        this.loadXml(v_xml);
    }

    //图像的宽度
    this.width=v_image.width;
    //图像的高度
    this.height=v_image.height;

    //申请一个纹理
    this.newTexture = System2D.prototype.gl.createTexture();


    //开始WEBGL纹理功能,这是一个坑,如果你的程序没有报错,但是不显示图片看看这里有没有开启

    //和上传顶点的过程是一样一样的,把这个纹理对象上传到WEBGL的状态机里
    System2D.prototype.gl.bindTexture(System2D.prototype.gl.TEXTURE_2D,this.newTexture);

    //这个函数之前没见过,看样子你不这样子设置画面会反转,那就这样设置吧
    System2D.prototype.gl.pixelStorei(System2D.prototype.gl.UNPACK_FLIP_Y_WEBGL, true);

    //坑
    System2D.prototype.gl.pixelStorei(System2D.prototype.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);


    //核心函数,利用newTexture.image生成纹理,我们实际渲染的不是load进来的图片而是一个纹理,后面的0参数看起来是纹理等级
    //的意思,在3D中会有多级纹理,比如1024*1024 512*512 256*256 ...一直到最小,这个操作是方便在远处的贴图以小精度也就是
    //等级显示,这样就不需要利用大图缩放而损失画面质量了,不过我们的2D游戏不会用到这个功能,后面的参数看起来是设置图像
    //的一些颜色信息,默认吧,默认吧
    System2D.prototype.gl.texImage2D(System2D.prototype.gl.TEXTURE_2D,0, System2D.prototype.gl.RGBA,System2D.prototype.gl.RGBA, System2D.prototype.gl.UNSIGNED_BYTE, v_image);

    System2D.prototype.gl.texParameteri(System2D.prototype.gl.TEXTURE_2D, System2D.prototype.gl.TEXTURE_MAG_FILTER, System2D.prototype.gl.LINEAR);

    //这里是设置缩小时的采样模式,原理同上,
    System2D.prototype.gl.texParameteri(System2D.prototype.gl.TEXTURE_2D, System2D.prototype.gl.TEXTURE_MIN_FILTER, System2D.prototype.gl.LINEAR);
   // System2D.prototype.gl.texParameteri(System2D.prototype.gl.TEXTURE_2D, System2D.prototype.gl.TEXTURE_WRAP_S, System2D.prototype.gl.LINEAR);

    //这里是设置缩小时的采样模式,原理同上,
    //System2D.prototype.gl.texParameteri(System2D.prototype.gl.TEXTURE_2D, System2D.prototype.gl.TEXTURE_WRAP_T, System2D.prototype.gl.LINEAR);

    //缩放的采样模式,这里是设置图像被放大时采样模式,为临近采样模式,这个参数很常用你最好把它封装起来,初始化时方便你
    //选择


    //清空状态机里的纹理,这里只是清除引用而已,不是清楚纹理,纹理我们已经经过状态机加工过了
    System2D.prototype.gl.bindTexture(System2D.prototype.gl.TEXTURE_2D, null);
}

//动画场景管理器
function QuadResource()
{
    /**
     * 动画场景信息
     */
    var mQuadDataList=[];

    this.setQuadDataList=function(value)
    {
        mQuadDataList=value;
    }

    this.getQuadDataList=function()
    {
        return mQuadDataList;
    }
    /**
     * 动画缓存
     */
    var mDictionary=null;

}

//批处理显示对象
function Quad(v_id,v_texture,v_vertices,v_textureCoords,v_verticesColour,v_data)
{

    var private_framePivotX=0;
    var private_framePivotY=0;
    var lastTime = 0;
    var targetTime = 0;
    var delay=0;
    var mScene=0;
    //动画当前帧序号
    var currentFrame=0;
    //动画总长度
    var totalFrame=1;
    var event2D=new EventDisplayer2D();
    var frameList=[];

    /**
     * 添加帧函数
     */
    this.addFrameScript=function(value)
    {
        frameList.push(value);
    }


    /**
     * 删除帧函数
     * @param value
     */
    this.removeFrameScript=function(value)
    {
        var index=frameList.indexOf(value);
        if(index!=-1)
            frameList.splice(index,1);
    }


    //获得事件类
    this.getEvent2D=function()
    {
        return event2D;
    }

    //是否启动
    this.private_isStart=false;

    //获得启动状态
    this.getIsStart=function()
    {
        return this.private_isStart;
    }

    //启动QUAD
    this.launch=function()
    {
        this.private_isStart=true;
    }

    //批处理对象的ID
    this.id=v_id;

    //外部传递进来的数组,根据ID动态改变数组里面的内容
    this.vertices=v_vertices;

    //接受UV信息,同上
    this.textureCoords=v_textureCoords;

    //接受顶点颜色信息,同上
    this.verticesColour=v_verticesColour;

    //设置切片的偏移X
    var private_frameX=0;

    //设置切片的偏移Y
    var private_frameY=0;

    //设置切片的宽度,设置默认值为纹理的宽度
    var private_framwWidth=v_texture.width;

    //设置切片的高度,设置默认值为纹理的高度
    var private_framwHeight=v_texture.height;

    var isPlay=false;


    //设置遮罩的坐标点和宽度高度
    this.maskRectangle=function(x,y,width,height)
    {
        private_frameX=x;
        private_frameY=y;
        private_framwWidth=width;
        private_framwHeight=height;
    }



    //创建4个顶点
    this.right_down_point=new Point2D();
    this.right_up_point=new Point2D();
    this.left_down_point=new Point2D();
    this.left_up_point=new Point2D();

    //创建一个面板
    this.panel=new Panel();

    //设置4个顶点的初始化坐标
    this.left_up_point.setX(-1.0*v_texture.width/System2D.prototype.stageHeight);
    this.left_up_point.setY(-1.0*v_texture.height/System2D.prototype.stageHeight);

    this.right_up_point.setX(1.0*v_texture.width/System2D.prototype.stageHeight);
    this.right_up_point.setY(-1.0*v_texture.height/System2D.prototype.stageHeight);

    this.left_down_point.setX(-1.0*v_texture.width/System2D.prototype.stageHeight);
    this.left_down_point.setY(1.0*v_texture.height/System2D.prototype.stageHeight);

    this.right_down_point.setX(1.0*v_texture.width/System2D.prototype.stageHeight);
    this.right_down_point.setY(1.0*v_texture.height/System2D.prototype.stageHeight);


    //获得顶点
    this.getVertex=function(value)
    {
        switch(value)
        {
            case 0:
                if(this.private_scaleX>0&&this.private_scaleY>0)
                {
                    return new Point2D(this.left_up_point.getX()/2*System2D.prototype.stageHeight,this.left_up_point.getY()/2*System2D.prototype.stageHeight);
                }else if(this.private_scaleX<0&&this.private_scaleY>0)
                {
                    return new Point2D(this.right_up_point.getX()/2*System2D.prototype.stageHeight,this.right_up_point.getY()/2*System2D.prototype.stageHeight);
                }else if(this.private_scaleX>0&&this.private_scaleY<0)
                {
                    return new Point2D(this.left_down_point.getX()/2*System2D.prototype.stageHeight,this.left_down_point.getY()/2*System2D.prototype.stageHeight);
                }else if(this.private_scaleX<0&&this.private_scaleY<0)
                {
                    return new Point2D(this.right_down_point.getX()/2*System2D.prototype.stageHeight,this.right_down_point.getY()/2*System2D.prototype.stageHeight);
                }
            case 1:
                if(this.private_scaleX>0&&this.private_scaleY>0)
                {
                    return new Point2D(this.left_down_point.getX()/2*System2D.prototype.stageHeight,this.left_down_point.getY()/2*System2D.prototype.stageHeight);
                }else if(this.private_scaleX<0&&this.private_scaleY>0)
                {
                    return new Point2D(this.right_down_point.getX()/2*System2D.prototype.stageHeight,this.right_down_point.getY()/2*System2D.prototype.stageHeight);
                }else if(this.private_scaleX>0&&this.private_scaleY<0)
                {
                    return new Point2D(this.left_up_point.getX()/2*System2D.prototype.stageHeight,this.left_up_point.getY()/2*System2D.prototype.stageHeight);
                }else if(this.private_scaleX<0&&this.private_scaleY<0)
                {
                    return new Point2D(this.right_up_point.getX()/2*System2D.prototype.stageHeight,this.right_up_point.getY()/2*System2D.prototype.stageHeight);
                }

            case 2:
                if(this.private_scaleX>0&&this.private_scaleY>0)
                {
                    return new Point2D(this.right_up_point.getX()/2*System2D.prototype.stageHeight,this.right_up_point.getY()/2*System2D.prototype.stageHeight);
                }else if(this.private_scaleX<0&&this.private_scaleY>0)
                {
                    return new Point2D(this.left_up_point.getX()/2*System2D.prototype.stageHeight,this.left_up_point.getY()/2*System2D.prototype.stageHeight);
                }else if(this.private_scaleX>0&&this.private_scaleY<0)
                {
                    return new Point2D(this.right_down_point.getX()/2*System2D.prototype.stageHeight,this.right_down_point.getY()/2*System2D.prototype.stageHeight);
                }else if(this.private_scaleX<0&&this.private_scaleY<0)
                {
                    return new Point2D(this.left_down_point.getX()/2*System2D.prototype.stageHeight,this.left_down_point.getY()/2*System2D.prototype.stageHeight);
                }

            case 3:
                if(this.private_scaleX>0&&this.private_scaleY>0)
                {
                    return new Point2D(this.right_down_point.getX()/2*System2D.prototype.stageHeight,this.right_down_point.getY()/2*System2D.prototype.stageHeight);
                }else if(this.private_scaleX<0&&this.private_scaleY>0)
                {
                    return new Point2D(this.left_down_point.getX()/2*System2D.prototype.stageHeight,this.left_down_point.getY()/2*System2D.prototype.stageHeight);
                }else if(this.private_scaleX>=0&&this.private_scaleY<0)
                {
                    return new Point2D(this.right_up_point.getX()/2*System2D.prototype.stageHeight,this.right_up_point.getY()/2*System2D.prototype.stageHeight);
                }else if(this.private_scaleX<0&&this.private_scaleY<0)
                {
                    return new Point2D(this.left_up_point.getX()/2*System2D.prototype.stageHeight,this.left_up_point.getY()/2*System2D.prototype.stageHeight);
                }
        }
    }
    //添加到面板里
    this.panel.addItem(this.right_down_point);
    this.panel.addItem(this.right_up_point);
    this.panel.addItem(this.left_down_point);
    this.panel.addItem(this.left_up_point);


    //查询名字
    this.queryName=function(name)
    {
        var frameDataList=v_texture.getQuadResource().getQuadDataList();
        for(var i=0;i<frameDataList.length;i++)
        {
            if(frameDataList[i].name==name)
            {
                return i;
            };
        };
        return 0;
    };


    var mLoop=false;

    this.loop=function(value)
    {
        mLoop=value;
    }

    this.play=function()
    {
        isPlay=true;
    }

    this.stop=function()
    {
        isPlay=false;
    }

    /**
     * 访问动画当前帧编号
     */
    this.getCurrentFrame=function()
    {
        return currentFrame;
    }

    /**
     * 获得动画长度
     */
    this.getTotalFrame=function()
    {
        return totalFrame;
    }

    this.gotoAndPlay=function(value)
    {
        currentFrame=value-1;
        isPlay=true;
    };

    this.gotoAndStop=function(value)
    {
        isPlay=false;
        currentFrame=value-1;
        this.upFrame(false);
    };
    /**
     设置场景,可以是数字或者名称
     **/
    this.setScene=function(value)
    {
        if(v_texture.getQuadResource()!=null)
        {
            if(isNaN(value))
            {
                mScene=this.queryName(value);
            }else
            {
                mScene=value-1;
            };
            currentFrame=0;
            totalFrame=v_texture.getQuadResource().getQuadDataList()[mScene].quadFrameLst.length;
            this.upFrame(false);
        }


    };

    /**
     * 获得场景ID
     * @return {Number}
     */
    this.getScene=function()
    {
        return mScene+1;
    }


     var isReset
    //游戏逻辑更新函数
    this.upFrameData=function()
    {
        var frameData=v_texture.getQuadResource().getQuadDataList()[mScene].quadFrameLst[currentFrame];
        this.maskRectangle(
            frameData.x,
            frameData.y,
            frameData.width,
            frameData.height);


        //设置动画的X偏移量,因为我们的裁切其实是以中心点开始的,所以需要加上切片的宽度的一半
        private_framePivotX=private_framwWidth/2-Number(frameData.frameX)-Number(frameData.frameWidth)/2;

         //原理同上
        private_framePivotY=private_framwHeight/2-Number(frameData.frameY)-Number(frameData.frameHeight)/2;

        this.private_isRedraw=true;

    }


    this.setWidth=function(value)
    {
        this.setScaleX(value/private_framwWidth);
    }

    this.setHeight=function(value)
    {
        this.setScaleY(value/private_framwHeight);
    }

    this.getWidth=function()
    {
        return private_framwWidth*this.getScaleX();
    }

    this.getHeight=function()
    {
        return private_framwHeight*this.getScaleY();
    }

    /**
     * 指示动画播放的帧率.
     * @param	frame 动画播放的帧率.
     */
    this.setAnimationSpeed=function(frame)
    {
        delay =1000 / frame;
    }

    /**
     * 更新帧信息
     */
    this.upFrame=function(updata)
    {
        if(v_texture.getQuadResource()!=null)
        {
            this.upFrameData();
            if(updata)
            {
                for(var i=0;i<frameList.length;i++)
                {
                    if(frameList[i].getFrame()==(currentFrame+1))
                    {

                        frameList[i].getCallBackFun()(this);
                    }
                }

                currentFrame++;

            }

            if(currentFrame>=totalFrame)
            {

                if(mLoop)
                {
                    currentFrame=0;
                }else
                {
                    currentFrame=totalFrame-1
                }
            }
        }
    }
    //重绘函数
    this.paint=function()
    {


        if(this.private_parent!=null&&this.private_visible&&this.private_isStart)
        {
            if(isPlay)
            {
                targetTime = new Date().getTime();
                if (targetTime - lastTime >=delay)
                {
                    lastTime = targetTime;
                    this.upFrame(true);
                }
            }

            if(this.private_isRedraw)
            {
                this.private_isRedraw=false;




                //填充数据
                this.panel.setX(this.private_x*2/System2D.prototype.stageHeight);
                //强制转换成笛卡尔第四象限坐标系
                this.panel.setY(this.private_y*2/System2D.prototype.stageHeight);
                this.panel.setRotation(this.private_rotation);

                this.panel.upDataMatrixData(
                    (this.private_pivotX+private_framePivotX)*this.private_scaleX*2/System2D.prototype.stageHeight,
                    (this.private_pivotY+private_framePivotY)*this.private_scaleY*2/System2D.prototype.stageHeight,
                    this.private_scaleX*private_framwWidth/v_texture.width,
                    this.private_scaleY*private_framwHeight/v_texture.height,
                    this.private_biasX,
                    this.private_biasY);

                /*if(v_texture.getQuadResource()==null)
                {
                    this.panel.upDataMatrixData(
                     (this.private_pivotX+private_framwWidth/2)*2/System2D.prototype.stageHeight,
                     (this.private_pivotY+private_framwHeight/2)*2/System2D.prototype.stageHeight,
                     this.private_scaleX*private_framwWidth/v_texture.width,
                     this.private_scaleY*private_framwHeight/v_texture.height,
                     this.private_biasX,
                     this.private_biasY);
                }else
                {
                    this.panel.upDataMatrixData(
                        (this.private_pivotX+private_framePivotX)*this.private_scaleX*2/System2D.prototype.stageHeight,
                        (this.private_pivotY+private_framePivotY)*this.private_scaleY*2/System2D.prototype.stageHeight,
                        this.private_scaleX*private_framwWidth/v_texture.width,
                        this.private_scaleY*private_framwHeight/v_texture.height,
                        this.private_biasX,
                        this.private_biasY);
                }*/




                //更新面板的矩阵信息
                this.panel.upDataMatrix();

            }
            //设置原始顶点偏移信息
            //把上一个章节设置的测试内容转移到了原始顶点，目的只有一个,我们需要一个中心点,我们所有的改变都需要围绕一个原点
            //比如设置切片的比例或者偏移量之后我们再旋转图像希望它能以原点旋转而不是自身旋转,这对于动画的偏移是很关键的
            //所以我们决定改变原始顶点信息,让外部的矩阵接受到坐标时就理解为它是偏移过的,所以它还是以0,0去旋转了偏移后的图像
            //这才是我们要的效果
            //设置坐标
            this.vertices[this.id*8]=this.left_up_point.getX();
            this.vertices[this.id*8+1]=this.left_up_point.getY();
            this.vertices[this.id*8+2]=this.right_up_point.getX();
            this.vertices[this.id*8+3]=this.right_up_point.getY();
            this.vertices[this.id*8+4]=this.right_down_point.getX();
            this.vertices[this.id*8+5]=this.right_down_point.getY();
            this.vertices[this.id*8+6]=this.left_down_point.getX();
            this.vertices[this.id*8+7]=this.left_down_point.getY();



            this.verticesColour[this.id*16]=this.private_r*this.private_alpha;
            this.verticesColour[this.id*16+1]=this.private_g*this.private_alpha;
            this.verticesColour[this.id*16+2]=this.private_b*this.private_alpha;
            this.verticesColour[this.id*16+3]=this.private_a*this.private_alpha

            this.verticesColour[this.id*16+4]=this.private_r*this.private_alpha;
            this.verticesColour[this.id*16+5]=this.private_g*this.private_alpha;
            this.verticesColour[this.id*16+6]=this.private_b*this.private_alpha;
            this.verticesColour[this.id*16+7]=this.private_a*this.private_alpha

            this.verticesColour[this.id*16+8]=this.private_r*this.private_alpha;
            this.verticesColour[this.id*16+9]=this.private_g*this.private_alpha;
            this.verticesColour[this.id*16+10]=this.private_b*this.private_alpha;
            this.verticesColour[this.id*16+11]=this.private_a*this.private_alpha

            this.verticesColour[this.id*16+12]=this.private_r*this.private_alpha;
            this.verticesColour[this.id*16+13]=this.private_g*this.private_alpha;
            this.verticesColour[this.id*16+14]=this.private_b*this.private_alpha;
            this.verticesColour[this.id*16+15]=this.private_a*this.private_alpha;


            //设置UV信息,因为我们希望用户输入实际的像素坐标而不是UV比例,所以把实际像素转换为实际的比例,下面分别设置了最大的
            //采样区域和偏移坐标注意有的地方只有一个值,那是因为前面的值为0，我只是把它删除了而已

            this.textureCoords[this.id*8]=private_frameX/v_texture.width;
            this.textureCoords[this.id*8+1]=-private_frameY/v_texture.height;

            this.textureCoords[this.id*8+2]=private_framwWidth/v_texture.width+private_frameX/v_texture.width;
            this.textureCoords[this.id*8+3]=-private_frameY/v_texture.height;

            this.textureCoords[this.id*8+4]=private_framwWidth/v_texture.width+private_frameX/v_texture.width;
            this.textureCoords[this.id*8+5]=-private_framwHeight/v_texture.height-private_frameY/v_texture.height;

            this.textureCoords[this.id*8+6]=private_frameX/v_texture.width;
            this.textureCoords[this.id*8+7]=-private_framwHeight/v_texture.height-private_frameY/v_texture.height;

        }else
        {
            this.vertices[this.id*8]=0;
            this.vertices[this.id*8+1]=0;
            this.vertices[this.id*8+2]=0;
            this.vertices[this.id*8+3]=0;
            this.vertices[this.id*8+4]=0;
            this.vertices[this.id*8+5]=0;
            this.vertices[this.id*8+6]=0;
            this.vertices[this.id*8+7]=0;
        }
    }


    //初始化顶点数据
    this.initVerticeData=function()
    {
        this.vertices[this.id*8]=0;
        this.vertices[this.id*8+1]=0;
        this.vertices[this.id*8+2]=0;
        this.vertices[this.id*8+3]=0;
        this.vertices[this.id*8+4]=0;
        this.vertices[this.id*8+5]=0;
        this.vertices[this.id*8+6]=0;
        this.vertices[this.id*8+7]=0;
        this.verticesColour[this.id*16]=0;
        this.verticesColour[this.id*16+1]=0;
        this.verticesColour[this.id*16+2]=0;
        this.verticesColour[this.id*16+3]=0;
        this.verticesColour[this.id*16+4]=0;
        this.verticesColour[this.id*16+5]=0;
        this.verticesColour[this.id*16+6]=0;
        this.verticesColour[this.id*16+7]=0;
        this.verticesColour[this.id*16+8]=0;
        this.verticesColour[this.id*16+9]=0;
        this.verticesColour[this.id*16+10]=0;
        this.verticesColour[this.id*16+11]=0;
        this.verticesColour[this.id*16+12]=0;
        this.verticesColour[this.id*16+13]=0;
        this.verticesColour[this.id*16+14]=0;
        this.verticesColour[this.id*16+15]=0;
        this.textureCoords[this.id*8]=0;
        this.textureCoords[this.id*8+1]=0;
        this.textureCoords[this.id*8+2]=0;
        this.textureCoords[this.id*8+3]=0;
        this.textureCoords[this.id*8+4]=0;
        this.textureCoords[this.id*8+5]=0;
        this.textureCoords[this.id*8+6]=0;
        this.textureCoords[this.id*8+7]=0;
    }

    this.initVerticeData();
    this.setScene(1);
    this.gotoAndPlay(1);

}

//XML载入类
function Loader()
{
    var event2D=new EventDisplayer2D();

    if (window.ActiveXObject){
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }else if (window.XMLHttpRequest){
        xmlHttp = new XMLHttpRequest("Msxml2.XMLHTTP.3.0");
    };

    //处理响应
    this.handleStateChange=function(){
        if (xmlHttp.readyState == 4){
            if (xmlHttp.status == 200){
                event2D.dispatchEvent(Event2D.prototype.COMPLETE,xmlHttp.responseXML);
            };
        };
    };



    this.load=function(url)
    {
        var str=url.split("");
        var urlName=str[str.length-3]+str[str.length-2]+str[str.length-1]
        if(urlName=="xml")
        {
            xmlHttp.onreadystatechange = this.handleStateChange;
            xmlHttp.open("GET",url,"true");
            xmlHttp.send(null);
        }else if(urlName=="png")
        {
            var imageObj;
            imageObj=new Image();
            imageObj.src=url;
            imageObj.onload=function(){
                if(imageObj.complete==true){
                    event2D.dispatchEvent(Event2D.prototype.COMPLETE,imageObj)
                }
            }
        }



    }
    this.getEvent2D=function()
    {
        return event2D;
    }
};

//帧信息
function QuadData()
{
    /**
     * 场景名称
     */
    this.name="";

    /**
     * 帧片段
     */
    this.quadFrameLst;
};


//帧缓存
function QuadFrame()
{
    /**
     * 帧名称
     */
    this.name="";

    /**
     * 帧X坐标
     */
    this.x = 0;

    /**
     * 帧Y坐标
     */
    this.y = 0;

    /**
     * 帧宽度
     */
    this.width = 0;

    /**
     * 帧高度
     */
    this.height = 0;

    /**
     * 帧X偏移坐标
     */
    this.frameX = 0;

    /**
     * 帧Y偏移坐标
     */
    this.frameY = 0;

    /**
     * 帧最大宽度
     */
    this.frameWidth = 0;

    /**
     * 帧最大高度
     */
    this.frameHeight = 0;
};

//粒子发射器
function GrainSend(v_movieClip2D,value)
{
    this.isPlay=true;

    //粒子出生X坐标
    this.x = 400;

    //粒子出生Y坐标
    this.y = 400;

    //粒子X随机范围
    this.scopeX = 10;

    //粒子Y随机范围
    this.scopeY = 10;

    //粒子X比例缩放值
    this.scaleXValue =- .01;

    //粒子Y比例缩放值
    this.scaleYValue =-.01;

    //粒子初始化颜色参数
    this.aVaLlue = 0;
    this.rVaLlue = -.002;
    this.gVaLlue = -.003;
    this.bVaLlue = -.004;

    //粒子角度递增值
    this.angleValue = 0;

    //粒子初始化角度
    this.rotationValue = 0

    //粒子随机角度
    this.rotationRandom = 0;

    //粒子运动速度
    this.speedValue = 0;

    //粒子初始化透明度
    this.alphaValue=-.02;

    //粒子递增颜色值
    this.r = 1
    this.g = .5
    this.b = .8
    this.a = 1

   this.list = [];

    //初始化粒子池
    for (var i = 0; i < value; i++)
    {
        var quad=v_movieClip2D.getQuad();
        v_movieClip2D.addQuad(quad);
        this.list.push(new Grain(quad));
    }

    //刷新函数
    this.paint=function()
    {
        for(var j=0;j<this.list.length;j++)
        {
            //如果粒子是启用状态
            if(this.list[j].isStart)
            {
                //刷新粒子逻辑
                this.list[j].paint();
            }
        }
    }

    /**
     * 获得粒子
     * @return
     */
    this.getGrain=function()
    {
        if(this.isPlay)
        for (var i = 0; i <this.list.length; i++)
        {
            //如果粒子未启动
            if (!this.list[i].isStart)
            {
                //填充粒子属性
                var grain = this.list[i];
                grain.show();
                grain.quad.setX(this.x + Math.random() * this.scopeX - this.scopeX / 2);
                grain.quad.setY(this.y + Math.random() * this.scopeY - this.scopeY / 2);

                grain.quad.setA(this.a);
                grain.quad.setR(this.r);
                grain.quad.setG(this.g);
                grain.quad.setB(this.b);

                grain.quad.setRotation(this.rotationValue);


                grain.rValue = this.rVaLlue;
                grain.gValue = this.gVaLlue;
                grain.bValue = this.bVaLlue;
                grain.aValue = this.aVaLlue;

                grain.angleValue = this.angleValue;
                grain.alphaValue = this.alphaValue;
                grain.scaleXValue=this.scaleXValue;
                grain.scaleYValue = this.scaleYValue;

                grain.rotationValue = this.rotationValue + Math.random() * this.rotationRandom;
                grain.speedValue = this.speedValue;
                break;
            }
        }
    }

   this.run=function()
    {
       this.getGrain();
       this.paint();
    }

}

//粒子对象
function Grain(v_quad)
{
    this.quad=v_quad;
    this.quad.setVisible(false);
    this.quad.setMouseEnabled(false);

    this.scaleXValue = 0;
    this.scaleYValue = 0;
    this.rValue=0;
    this.gValue=0
    this.bValue=0
    this.aValue=0

    this.angleValue=0;
    this.rotationValue=0;
    this.speedValue=0;
    this.alphaValue=0;

    //粒子启动函数
    this.isStart=false;




    //绘制函数,核心功能
    this.paint=function(){
        //让角度加上旋转角度
        this.rotationValue += this.angleValue;

        //让粒子按照指定的速度和方向运动
        this.quad.setX(this.quad.getX()+Math.cos(this.rotationValue) * this.speedValue);
        this.quad.setY(this.quad.getY()+Math.sin(this.rotationValue) *this.speedValue);

        this.quad.setScaleX(this.quad.getScaleX()+this.scaleXValue);
        this.quad.setScaleY(this.quad.getScaleY()+this.scaleYValue);

        //所有属性加上某个值
        this.quad.setAlpha(this.quad.getAlpha()+this.alphaValue);
        this.quad.setR(this.quad.getR()+this.rValue);
        this.quad.setG(this.quad.getG()+this.gValue);
        this.quad.setB(this.quad.getB()+this.bValue);
        this.quad.setA(this.quad.getA()+this.aValue);

        //如果透明度小于0就清理粒子
        if (this.quad.getAlpha()<= 0||this.quad.getScaleX()<=0||this.quad.getScaleY()<=0)
        {
            this.clear();
        }
    }


    //初始化粒子的所有状态
    this.show=function()
    {
        this.quad.setAlpha(1);
        this.quad.setScaleX(1);
        this.quad.setScaleY(1);
        this.quad.setR(1);
        this.quad.setG(1);
        this.quad.setB(1);
        this.quad.setA(1);
        this.quad.setVisible(true);
        this.isStart = true;
    }

    /**
     * 清理粒子
     */
    this.clear=function()
    {
        this.quad.setVisible(false);
        this.isStart = false;
    }

}


/**
 * 连连看算法类。
 * @author
 */
function Asqare2D(){

    //缓存数组A
    var cacheA =[];

    //缓存数组B
    var cacheB =[];

    //定义存放数组
    var type;

    //定义三级开关
    var goalA = [];

    //节点
    var goalB = [];

    //路径
    var path = [];

    //通路ID
    var open = 0;


    /**
     * 连连看算法(参数1:地图数据,参数2:开始点,参数3:结束点),如果可以连接则返回路径否则返回null,0为可通行
     * @example
     */
    this.getPath=function(map,p1,p2){
        type=false;
        path=[];
        //三级为假
        //6个返回数组
        if (this.find(map, p1, p2)) {
            path.push(p1, p2);
            return path;
            // 如果1级检测成功，则马上返回
        }else {
            cacheA=[];
            //2级数组
            this.push(map,cacheA,p1);
            this.push(map,cacheA, p2);
            var leg = cacheA.length - 1;
            var lej=cacheA.length
            for (var j=0; j<leg; j++) {
                for (var k=j+1; k<lej; k++) {
                    if (cacheA[j][0]==cacheA[k][0]&&cacheA[j][1]==cacheA[k][1]) {
                        path.push(p1,cacheA[j],p2);
                        return path;
                    }
                }
            }
            if (type == false) {
                cacheA=[];
                cacheB=[];
                this.push(map,cacheA,p1);
                this.push(map, cacheB, p2);
                var len = cacheA.length;
                var le = cacheB.length;
                for (var n = 0; n < len; n++) {
                    for (var m = 0; m < le; m++) {
                        if (cacheA[n][0]==cacheB[m][0]||cacheA[n][1]==cacheB[m][1]) {
                            goalA=[cacheA[n][0],cacheA[n][1]];
                            goalB = [cacheB[m][0],cacheB[m][1]];
                            if (this.find(map,goalA,goalB)) {
                                path.push(p1,goalA,goalB,p2);
                                return path;
                            }
                        }
                    }
                }
            }
        }

        return null;
    }

    this.push=function(map,arr,p) {
            for (var i=p[0]+1; i<map.length; i++) {
            if (map[i][p[1]]==open) {
                arr.push([i,p[1]]);
            } else {
                break;
            }
        }
        for (var j=p[0]-1; j>=0; j--) {
            if (map[j][p[1]]==open) {
                arr.push([j,p[1]]);
            } else {
                break;
            }
        }
        for (var n=p[1]+1; n<map[0].length; n++) {
            if (map[p[0]][n]==open) {
                arr.push([p[0],n]);
            } else {
                break;
            }
        }
        for (var m=p[1]-1; m>=0; m--) {
            if (p[1]-1>=0) {
                if (map[p[0]][m]==open) {
                    arr.push([p[0],m]);
                } else {
                    break;
                }
            }
        }
    }

    this.find=function(map,p1,p2) {
        if (p1[0]==p2[0]) {
            if (p1[1]<p2[1]) {
                for (var i=p1[1]+1; i<p2[1]; i++) {
                    if (map[p1[0]][i]!=open) {
                        //0为可通行
                        return false;
                    }
                }

                return true;
            } else if (p1[1]>p2[1]) {
                for (var j=p2[1]+1; j<p1[1]; j++) {
                    if (map[p2[0]][j] != open) {
                        return false;
                    }
                }
                return true;
            }
        } else if (p1[1]==p2[1]) {
            if (p1[0]<p2[0]) {
                for (var n=p1[0]+1; n<p2[0]; n++) {
                    if (map[n][p1[1]] != open) {
                        return false;
                    }
                }

                return true;
            } else if (p1[0]>p2[0]) {
                for (var m=p2[0]+1; m<p1[0]; m++) {
                    if (map[m][p2[1]]!=open) {
                        return false;
                    }
                }
                return true;
            }
        } else {
            return false;
        }
        return false;
    }
}

