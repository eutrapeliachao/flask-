# coding=utf-8

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import render_template, request, redirect, url_for, jsonify


app = Flask(__name__, static_folder='', static_url_path='')

# 设置连接数据
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:mysql@localhost/flask_login'
# 设置成 True，SQLAlchemy 将会追踪对象的修改并且发送信号。这需要额外的内存， 如果不必要的可以禁用它。
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_ECHO'] = True
# 实例化SQLAlchemy对象
db = SQLAlchemy(app)
# 定义模型类
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32))
    email = db.Column(db.String(32))
    pswd = db.Column(db.String(32))


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/login/check', methods=['GET', 'POST'])
def login_check():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        # print username, password
        # 根据用户名和密码查询账户
        passport = User.query.filter_by(name=username, pswd=password).first()
        if passport:
            return "登录成功"
        else:
            return "帐号或密码错误，登录失败"


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('register.html')
    else:
        username = request.form['user_name']
        password = request.form['pwd']
        email = request.form['email']
        # print username, password, email
        # 用户注册
        db_user = User(name=username, pswd=password, email=email)
        db.session.add(db_user)
        db.session.commit()
    return redirect(url_for('login'))


@app.route('/check_user_name_exist/')
def check_user_name_exist():
    username = request.args.get('username')
    passport = User.query.filter_by(name=username).first()
    # 通过返回的json数据判断是否注册
    if passport:
        return jsonify({'res': 0})
    else:
        return jsonify({'res': 1})


if __name__ == '__main__':
    app.run(debug=True)

