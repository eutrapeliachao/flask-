$(function(){
	//$.ajaxSetup({async:false})
	var error_name = false;
	var error_password = false;
	var error_check_password = false;
	var error_email = false;


	$('#user_name').blur(function() {
		check_user_name()
		if (error_name==false){
			//check_user_name_exist()
			// 发起异步ajax请求
			check_user_name_exist2(true)
		}
	});

	$('#pwd').blur(function() {
		check_pwd();
	});

	$('#cpwd').blur(function() {
		check_cpwd();
	});

	$('#email').blur(function() {
		check_email();
	});


	function check_user_name_exist() {
		//1.获取用户名
		username = $('#user_name').val()
		//2. 发起get请求
		$.get('/check_user_name_exist/?username='+username, function (data) {
			//
			//alert(data.res)
			if (data.res == 0){
				//用户名已注册
				$('#user_name').next().html('用户名已注册').show()
				error_name = true
			}
			else {
				$('#user_name').next().html('').hide()
				error_name = false
			}
        })
    }
	function check_user_name_exist2(async){
		//1.获取用户名
		username = $('#user_name').val()
		$.ajax({
			'url':'/check_user_name_exist/?username='+username,
			'async':async,
			'success':function (data) {
				if (data.res == 0){
				//用户名已注册
					$('#user_name').next().html('用户名已注册').show()
					error_name = true
				}
				else {
					$('#user_name').next().html('').hide()
					error_name = false
				}
            }
		})
	}

	function check_user_name(){
		var len = $('#user_name').val().length;
		if(len<5||len>20)
		{
			$('#user_name').next().html('请输入5-20个字符的用户名')
			$('#user_name').next().show();
			error_name = true;
		}
		else
		{
			$('#user_name').next().hide();
			error_name = false;
		}
	}

	function check_pwd(){
		var len = $('#pwd').val().length;
		if(len<8||len>20)
		{
			$('#pwd').next().html('密码最少8位，最长20位')
			$('#pwd').next().show();
			error_password = true;
		}
		else
		{
			$('#pwd').next().hide();
			error_password = false;
		}
	}


	function check_cpwd(){
		var pass = $('#pwd').val();
		var cpass = $('#cpwd').val();

		if(pass!=cpass)
		{
			$('#cpwd').next().html('两次输入的密码不一致')
			$('#cpwd').next().show();
			error_check_password = true;
		}
		else
		{
			$('#cpwd').next().hide();
			error_check_password = false;
		}

	}

	function check_email(){
		var re = /^[a-z0-9][\w\.\-]*@[a-z0-9\-]+(\.[a-z]{2,5}){1,2}$/;

		if(re.test($('#email').val()))
		{
			$('#email').next().hide();
			error_email = false;
		}
		else
		{
			$('#email').next().html('你输入的邮箱格式不正确')
			$('#email').next().show();
			error_check_password = true;
		}

	}

	$('#reg_form2').submit(function() {
		check_user_name();
		//check_user_name_exist();
		// 发起同步ajax请求
		check_user_name_exist2(false)
		check_pwd();
		check_cpwd();
		check_email();

		if(error_name == false && error_password == false && error_check_password == false && error_email == false && error_check == false)
		{
			return true;
		}
		else
		{
			return false;
		}

	});

})