import requests
import json

r = requests.get("https://5e.tools/data/bestiary/index.json?v=1.122.8")
resp = r.json()

monsters = []
url = "https://5e.tools/data/bestiary/"
v = "v=1.122.8"

for k in resp.keys():
    print("Downloading:", resp[k])
    try:
        curr_r = requests.get(f"{url}{resp[k]}?{v}")
        try:
            with open("monsters.json", "a+") as f:
                f.write(json.dumps(curr_r.json()["monster"]))
                f.write(",\n")
            print("Downloaded:", resp[k])
        except:
            print("failed to write to file")
    except:
        print("failed to download:", resp[k])

with open("monsters.json", "a+") as f:
    f.write("]\n}")
