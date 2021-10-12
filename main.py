from Flask import Flask, request, render_template
from flask_cors import CORS
import requests
from threading import Thread

app = Flask(__name__)
CORS(app)
result_data = {}


def post_data(examOrder, examSeriesNumber, examBirthday):
    data = {}
    data['examOrder'] = examOrder
    data['examSeriesNumber'] = examSeriesNumber
    data['examBirthday'] = examBirthday

    url = 'http://score.koreaxin.net/TopikScore/QueryExam'
    url = "http://topikscore.fooor.cn/?from=singlemessage"
    s = requests.session()
    headers = """
    Accept: */*
    Accept-Encoding: gzip, deflate
    Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
    Connection: close
    Content-Length: 64
    Content-Type: application/x-www-form-urlencoded; charset=UTF-8
    Host: score.koreaxin.net
    Origin: http://score.koreaxin.net
    Referer: http://score.koreaxin.net/TopikScore/
    User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36
    X-Requested-With: XMLHttpRequest
    """

    def kv2dict(kv):
        headers = kv.strip().split('\n')
        headers = {x.split(':')[0].strip(): ("".join(x.split(':')[1:])).strip().replace('//', "://") for x in headers}
        return headers

    c = s.post(url, headers=kv2dict(headers), data=data).content.decode('utf-8')
    try:
        result = ''
        toks = c.split('\r\n')
        for tok in toks:
            temp = tok.split(': ')
            result += str(temp[0]) + ': ' + str(temp[1]) + '\n'
    except:
        result_data['key'] = "没有查到对应信息，请检查输入"
        return
    result_data['key'] = result.replace('\r', '')
    print('2', result_data)
    return


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/get_data')
def get_data():
    query = request.args
    print(query)
    thread = Thread(target=post_data,
                    args=(query['examOrder'], query['examSeriesNumber'], query['year'] + query['month'] + query['day']))
    thread.start()
    thread.join()
    resp = result_data['key']
    del result_data['key']
    return resp


if __name__ == '__main__':
    app.run(host='0.0.0.0')
