#!/usr/bin/env python
# coding: utf-8

# In[1]:


import requests
import re
import json


# In[2]:


from bs4 import BeautifulSoup

proxy = {
    "http": "http://127.0.0.1:2080"
}

# In[13]:


packages = []
for page in range(1, 5):
    html = requests.get(
        "https://osu.ppy.sh/beatmaps/packs?type=chart&page=" + str(page), proxies=proxy)
    soup = BeautifulSoup(html.text, 'html.parser')
    data = soup.select(".beatmap-packs > .beatmap-pack")
    for da in data:
        packages.append({
            'packageId': da['data-pack-id'],
            'title': da.div.text,
            'beatmap': []
        })


# In[14]:


for pa in packages:
    beatmap = []
    html = requests.get(
        "https://osu.ppy.sh/beatmaps/packs/" + pa["packageId"] + "/raw", proxies=proxy)
    soup = BeautifulSoup(html.text, 'lxml')
    data = soup.select(".beatmap-pack-items__set")
    for item in data:
        beatmap.append(re.findall("\d+", item.a["href"])[0])
    pa['beatmap'] = beatmap


# In[15]:


f = open('e:/chart1-4.json', 'w')


# In[16]:


f.write(json.dumps(packages))


# In[17]:


f.close()


# In[ ]:
