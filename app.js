const axios = require('axios');
const start_time_stamp = new Date();

const main_loop = () => {
    setTimeout(() => {

        const time_stamp = new Date();
        const delta = time_stamp - start_time_stamp;
        axios.get('https://fanuc-robot-http-server.herokuapp.com/')
            .then((res) => {
                    
            //Koodi
            const regexp = 'Joint[ ]+[0-9]:[ ]+([ -][0-9]+.[0-9]+)';
            let joints = [];
            let matches = res.data.matchAll(regexp);
            let count = 0;
            for (const match of matches) {
                count++;
                if (count > 6) break;
                const value = parseFloat(match[1]);
                joints.push(value);
            }

            console.log(time_stamp, joints, delta, "ms");
            });
        main_loop();
    }, 10);
}

main_loop();
       

   