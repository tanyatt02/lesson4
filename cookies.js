let s = document.cookie;
            let count = parseInt(s.slice(s.indexOf('count') + 6), 10);
            if (count >= 1 && count <= 10) {
                document.getElementById('count').value = count
            } else {
                document.getElementById('count').value = 1
            }
            if (s.indexOf('meduza') > -1) document.getElementById('source').options[2].selected = true;
            if (s.indexOf('RBC%20quote') > -1) document.getElementById('source').options[1].selected = true;