import React from 'react'
import acc from './accounts.svg'
// import * as Icon from 'bootstrap-icons';
export default function Contact() {
    return (
        <>
                <div className="container marketing m-3 justify-content-center text-center">
                    <div className="row">
                        <div className="col-lg-4">
                            <img className="img" src={acc} alt="this is car image" />
                            {/* <svg className="bd-placeholder-img rounded-circle" width="140" height="140" src="" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="" /><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg> */}

                            <h2>Mohd. Ahmar Zaidi</h2>
                            <p><i class="bi bi-envelope"></i> ahmarzaidi07@gmail.com</p>
                            <p><i class="bi bi-telephone">  9554748555</i></p>
                            {/* <p><i class="bi bi-github"></i> <a href=""></a></p> */}
                            <p><a className="btn btn-secondary" href="https://github.com/AhmarZaidi"><i class="bi bi-github"></i> Github &raquo;</a></p>
                        </div>



                        <div className="col-lg-4">
                            <img className="img" src={acc} alt="this is car image" />
                            <h2>Sarthak Jaiswal</h2>
                            <p><i class="bi bi-envelope"></i> sarthak.8858@gmail.com</p>
                            <p><i class="bi bi-telephone">  8174805384</i></p>
                            {/* <p><i class="bi bi-github"></i> <a href=""></a></p> */}
                            <p><a className="btn btn-secondary" href="https://github.com/sarthak-19"><i class="bi bi-github"></i> Github &raquo;</a></p>
                        </div>



                        <div className="col-lg-4">
                            {/* <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777" /><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg> */}
                            <img className="img" src={acc} alt="this is car image" />
                            <h2>Piyush Singh</h2>
                            <p><i class="bi bi-envelope"></i> piyushsingh9862@gmail.com</p>
                            <p><i class="bi bi-telephone">  8090838699</i></p>
                            {/* <p><i class="bi bi-github"></i> <a href=""></a></p> */}
                            <p><a className="btn btn-secondary" href="https://github.com/piyushsingh9862"><i class="bi bi-github"></i> Github &raquo;</a></p>
                        </div>



                        <div className="col-lg-4">
                            {/* <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777" /><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg> */}
                            <img className="img" src={acc} alt="this is car image" />
                            <h2>Saurabh Mor</h2>
                            <p><i class="bi bi-envelope"></i> saurabhMor09@gmail.com</p>
                            <p><i class="bi bi-telephone">  9991237555</i></p>
                            {/* <p><i class="bi bi-github"></i> <a href=""></a></p> */}
                            <p><a className="btn btn-secondary" href="#"><i class="bi bi-github"></i> Github &raquo;</a></p>
                        </div>
                        
                    </div>
                </div>
            </>
            )
}
