import "./login.css";
import React, {useEffect} from "react";
import {Field, Form, Formik} from "formik";
import * as userService from "../../service/UserService"
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.min.css'

export function Login() {
    const nav = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className="login-root">
                <div className="box-root flex-flex flex-direction--column" style={{minHeight: "100vh", flexGrow: "1"}}>
                    <div className="loginbackground box-background--white padding-top--64">
                        <div className="loginbackground-gridContainer">
                            <div className="box-root flex-flex" style={{gridArea: "top / start / 8 / end"}}>
                                <div className="box-root"
                                     style={{
                                         backgroundImage: "linear-gradient(white 0%, rgb(247, 250, 252) 33%)",
                                         flexGrow: "1"
                                     }}>
                                </div>
                            </div>
                            <div className="box-root flex-flex" style={{gridArea: "4 / 2 / auto / 5"}}>
                                <div className="box-root box-divider--light-all-2 animationLeftRight tans3s"
                                     style={{flexGrow: "1"}}/>
                            </div>
                            <div className="box-root flex-flex" style={{gridArea: "6 / start / auto / 2"}}>
                                <div className="box-root box-background--blue800" style={{flexGrow: "1"}}/>
                            </div>
                            <div className="box-root flex-flex" style={{gridArea: "7 / start / auto / 4"}}>
                                <div className="box-root box-background--blue animationLeftRight"
                                     style={{flexGrow: "1"}}/>
                            </div>
                            <div className="box-root flex-flex" style={{gridArea: "8 / 4 / auto / 6"}}>
                                <div className="box-root box-background--gray100 animationLeftRight tans3s"
                                     style={{flexGrow: "1"}}/>
                            </div>
                            <div className="box-root flex-flex" style={{gridArea: "2 / 15 / auto / end"}}>
                                <div className="box-root box-background--cyan200 animationRightLeft tans4s"
                                     style={{flexGrow: "1"}}/>
                            </div>
                            <div className="box-root flex-flex" style={{gridArea: "3 / 14 / auto / end"}}>
                                <div className="box-root box-background--blue animationRightLeft"
                                     style={{flexGrow: "1"}}/>
                            </div>
                            <div className="box-root flex-flex" style={{gridArea: "4 / 17 / auto / 20"}}>
                                <div className="box-root box-background--gray100 animationRightLeft tans4s"
                                     style={{flexGrow: "1"}}/>
                            </div>
                            <div className="box-root flex-flex" style={{gridArea: "5 / 14 / auto / 17"}}>
                                <div className="box-root box-divider--light-all-2 animationRightLeft tans3s"
                                     style={{flexGrow: "1"}}/>
                            </div>
                        </div>
                    </div>
                    <div className="box-root padding-top--24 flex-flex flex-direction--column"
                         style={{flexGrow: "1", zIndex: "9"}}>
                        <div
                            className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
                            <h1><a className="a-login" href="http://blog.stackfindover.com/" rel="dofollow">ELSU
                                RACING</a>
                            </h1>
                        </div>
                        <div className="formbg-outer">
                            <div className="formbg">
                                <div className="formbg-inner padding-horizontal--48">
                                    {/*<span className="padding-bottom--15">Đăng nhập vào tài khoản </span>*/}

                                    <Formik initialValues={{
                                        username: '',
                                        password: ''
                                    }}
                                            onSubmit={async (value, {setSubmitting}) => {
                                                try {
                                                    const res = await userService.login(value)
                                                    if (res.token) {
                                                        localStorage.setItem("token", res.token)
                                                        localStorage.setItem("username", res.username)
                                                        localStorage.setItem("role", res.role)
                                                    }
                                                    toast('Đăng nhập thành công')
                                                    nav("/")
                                                } catch (e) {
                                                    toast.error(e.res.data);
                                                } finally {
                                                    setSubmitting(false)
                                                }
                                            }}>

                                        <Form id="stripe-login">
                                            <div className="field padding-bottom--24">
                                                <label htmlFor="username" style={{fontSize: "16px"}}>Tên đăng nhập</label>
                                                <Field type="text" name="username" id="username"/>
                                            </div>
                                            <div className="field padding-bottom--24">
                                                <div className="grid--50-50">
                                                    <label htmlFor="password" style={{fontSize: "16px"}}>Mật
                                                        khẩu</label>
                                                    <div className="reset-pass" id="password">
                                                        <a className="a-login" href="#">Quên mật khẩu?</a>
                                                    </div>
                                                </div>
                                                <Field type="password" name="password"/>
                                            </div>
                                            <div
                                                className="field field-checkbox padding-bottom--24 flex-flex align-center">
                                                <label className="label-login" htmlFor="checkbox"
                                                       style={{fontSize: "13px"}}>
                                                    <Field id="checkbox" type="checkbox" name="checkbox"/> Nhớ mật khẩu
                                                </label>
                                            </div>
                                            <div className="field padding-bottom--24">
                                                <input type="submit" name="submit" value="Continue"/>
                                            </div>
                                            <div className="field">
                                                <a className="ssolink a-login" href="#">Dùng tài khoản facebook để đăng
                                                    nhập </a>
                                            </div>
                                        </Form>
                                    </Formik>
                                </div>
                            </div>

                            <div className="footer-link padding-top--24">
                            <span className="span-login">Bạn chưa có tài khoản? <a className="a-login"
                                                                                   href="">Đăng kí </a></span>
                                <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
                                    <span className="span-login"><a className="a-login"
                                                                    href="#">© Elsu Racing</a></span>
                                    <span className="span-login"><a className="a-login" href="#">Liên hệ </a></span>
                                    <span className="span-login"><a className="a-login"
                                                                    href="#">Quyền riêng tư - điều khoản</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}