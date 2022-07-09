const placeholder = (req, res) => {
    res.json({ message: "root path"});
    console.log('root path');
}

module.exports = { placeholder };