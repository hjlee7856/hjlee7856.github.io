import CustomModal from '@/components/customModal';
import LoginBody from '@/components/login/loginBody';
import useModalStore from '@/store/modalStore';

const LoginModal = () => {
  const { loginModalOpen, setLoginModalOpen } = useModalStore();
  return <CustomModal children={<LoginBody />} open={loginModalOpen} setOpen={setLoginModalOpen} />;
};

export default LoginModal;
