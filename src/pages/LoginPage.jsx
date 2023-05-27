import React from 'react';
// import Loading from '../components/Loading';
import LoginAgree from '../components/LoginAgree';
// import LoginSocial from '../components/LoginSocial';
import Loading from '../components/Loading';

function LoginPage() {
  // const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(true);
  // const [redirectPage, setRedirectPage] = useState({
  //   agree: false,
  //   next: false,
  //   social: false,
  // });
  const isLoading = false;

  return (
    <div className='flex flex-col h-[812px] justify-center  items-center'>
      {/* {isLoading ? <Loading /> : null} */}
      {/* {!redirectPage.next && <LoginAgree setRedirectPage={setRedirectPage} />}
      {redirectPage.social && <LoginSocial setRedirectPage={setRedirectPage} />} */}
      {isLoading ? <Loading /> : <LoginAgree />}
    </div>
  );
}

export default LoginPage;
