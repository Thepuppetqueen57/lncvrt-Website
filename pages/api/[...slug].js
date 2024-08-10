export default function handler(req, res) {
    res.status(404).send(
        JSON.stringify({ message: "404: Not Found" }, null, 4)
    );
}
