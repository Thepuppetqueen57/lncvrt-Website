export async function getServerSideProps() {
    return {
        redirect: {
            destination: "https://discord.gg/u6ptCvBwqE",
            permanent: false,
        },
    };
}

function Discord() {
    return null;
}

export default Discord;
