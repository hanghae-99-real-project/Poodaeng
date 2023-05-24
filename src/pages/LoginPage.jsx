import React, { useState } from 'react';
import Loading from '../components/Loading';
import LoginAgree from '../components/LoginAgree';
import LoginSocial from '../components/LoginSocial';

function LoginPage() {
  // const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(true);
  const [redirectPage, setRedirectPage] = useState({
    agree: false,
    next: false,
    social: false,
  });
  const isLoading = false;

  return (
    <div className='flex flex-col  items-center'>
      {isLoading ? <Loading /> : null}
      {!redirectPage.next && <LoginAgree setRedirectPage={setRedirectPage} />}
      {redirectPage.social && <LoginSocial setRedirectPage={setRedirectPage} />}
    </div>
  );
}

export default LoginPage;
