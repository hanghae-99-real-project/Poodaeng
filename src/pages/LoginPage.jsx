import React, { useEffect, useState } from 'react';
// import Loading from '../components/Loading';
import LoginAgree from '../components/LoginAgree';
// import LoginSocial from '../components/LoginSocial';
import Loading from '../components/common/Loading';

function LoginPage() {
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  // const [redirectPage, setRedirectPage] = useState({
  //   agree: false,
  //   next: false,
  //   social: false,
  // });

  /* 나중에 캐릭 랜덤으로 나오도록 만들 예정 */
  useEffect(() => {
    const animation = setTimeout(() => setIsLoading(false), 1500);

    return () => clearTimeout(animation);
  }, []);
  // const isLoading = true;

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
