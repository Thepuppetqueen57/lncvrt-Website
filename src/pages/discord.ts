import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => ({
    redirect: {
        destination: "https://discord.gg/V9K2kqRVNF",
        permanent: false,
    },
});

const Discord: React.FC = () => null;

export default Discord;
