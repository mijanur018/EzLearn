const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/lm1');
}
main().then(
    () => { console.log('mongodb is connected') }
)
    .catch(
        (err) => { console.log(err) }
    )
module.exports=mongoose;