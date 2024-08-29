import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => ({
    redirect: {
        destination: "https://discord.gg/u6ptCvBwqE",
        permanent: false,
    },
});

const Discord: React.FC = () => null;

export default Discord;
