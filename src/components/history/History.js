import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import moment from "moment";
import * as historyService from '../../service/OrderAndOrderDetail'
import {FormattedNumber} from "react-intl";

export function History() {
    const [historyList, setHistory] = useState([])
    const [historyDetail, setHistoryDetail] = useState([])
    const [showModal, setShowModal] = useState(false);
    const token = localStorage.getItem("token");
    const nav = useNavigate()
    const getAllHistory = async () => {
        const res = await historyService.listHistory()
        setHistory(res)


    }
    const handleModalClose = () => {
        setShowModal(false);
    };
    const handleModalOpen = async (id) => {
        const res = await historyService.historyDetail(id)
        setHistoryDetail(res)
        setShowModal(true);
    };
    useEffect(() => {
        getAllHistory()
    }, [])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    if (!historyDetail) {
        return null;
    }

    return (
        <>
            <div className="wrapper rounded">

                <div className="d-flex justify-content-between align-items-center mt-3">
                    <ul className="nav nav-tabs w-75">
                        <li className="nav-item"><a className="nav-link active">Lịch sử thanh toán</a></li>
                        {/*<li className="nav-item"><a className="nav-link" href="#">Reports</a></li>*/}
                    </ul>
                </div>
                <div className="table-responsive mt-3">
                    <table className="table table-dark table-borderless">
                        <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên khách hàng</th>
                            <th scope="col">Ngày giao dịch</th>
                            <th scope="col" className="text-right">Tổng tiền</th>
                        </tr>
                        </thead>
                        {historyList == '' ?
                            <tr>
                                <td colSpan={4} className="text-center">
                                    <h4 className="text-danger mt-4">Bạn chưa có đơn giao dịch nào</h4>
                                </td>
                            </tr>
                            :
                            <tbody>
                            {historyList.map((list, index) => (
                                <tr>
                                    <td scope="row"><span className="fa fa-briefcase mr-1"></span> {index+1}</td>
                                    <td><span className="fa fa-cc-mastercard"></span></td>
                                    <td className="text-muted">{list.createDate === "" ? "" :
                                        moment(list.createDate, 'YYYY/MM/DD').format('DD/MM/YYYY')
                                    } </td>
                                    <td className="d-flex justify-content-end align-items-center"><span
                                        className="fa fa-long-arrow-up mr-1"></span> <FormattedNumber
                                        value={list.totalPrice}>
                                        thousandSeparator={true} currency="VND"
                                        minimumFractionDigits={0}
                                    </FormattedNumber> đ
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        }
                    </table>
                </div>
                <div className="d-flex justify-content-between align-items-center results"><span className="pl-md-3"><b
                    className="text-black"> 1-7 0f 200 </b></span>
                    <div className="pt-3">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item disabled"><a className="page-link" href="#"
                                                                      aria-label="Previous"> <span
                                    aria-hidden="true">&lt;</span> </a></li>
                                <li className="page-item"><a className="page-link" href="#" aria-label="Next"> <span
                                    aria-hidden="true">&gt;</span> </a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}