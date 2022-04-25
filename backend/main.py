from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import couchdb
from database import *
from functions import *

app = FastAPI()

langCode_path = 'Data/langCode.json'
birth_country_path = 'Data/AURIN/country_of_birth.csv'
lang_spoken_path = 'Data/AURIN/lang.csv'

topics = ['housing', 'cost', 'transportation']

origins = ['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers=['*'],
)


@app.get('/')
async def home():
    return {'Melbourne' : 'The most liveable city?'}


@app.get('/now_trending')
async def hashtag():
    hashtags = now_trending(tweet_db, 20)
    if hashtags:
        return hashtags
    raise HTTPException(400, 'Something went wrong.')


@app.get('/now_trending/{tag}')
async def hashtag(tag:str):
    if tag:
        hashtags = now_trending(tweet_db, 20)
    if hashtags.get(hashtag, None) is not None:
        return hashtags[tag]
    raise HTTPException(404, f'Hashtag {tag} not found.')


@app.get('/languages')
async def languages():
    languages = top_n_lang_count(tweet_db, langCode_path, 10)

    if languages:
        return languages
    raise HTTPException(400, 'Something went wrong')


@app.get('/languages_birth')
async def languages_birth():
    languages = top_n_lang_count(tweet_db, langCode_path, 10)
    birth = top_n_birth_country(birth_country_path, 10)
    if languages and birth:
        return languages, birth
    raise HTTPException(400, 'Something went wrong')


@app.get('/languages_spoken')
async def languages_spoken():
    languages = top_n_lang_count(tweet_db, langCode_path, 10)
    spoken = top_n_lang_spoken_at_home(lang_spoken_path, langCode_path, 10)

    if languages and spoken:
        return languages, spoken
    raise HTTPException(400, 'Something went wrong')


@app.get('/languages/{language}')
async def languages(language: str):
    if language:
        languages = top_n_lang_count(tweet_db, langCode_path, 10)
    if languages.get(language.capitalize(), None) is not None:
        return languages[language.capitalize()]
    raise HTTPException(404, f'{language} is not among the top 10 most tweeted languages (other than English) in Melbourne!')


@app.get('/topic_trend/{topic}')
async def trend(topic:str):
    if topic in topics:
        year_topic, year_total, percent = topic_trend(tweet_db, topic)
        return year_topic, year_total, percent
    raise HTTPException(404, 'Please select from cost, housing and transportation.')


@app.get('/year_topic/{topic}')
async def topic(topic:str):
    if topic in topics:
        topic_db = db_connect(topic + '_text')
        topic_wordcloud_save(tweet_db, topic, topic_db)
        yearly_tweets = topic_word_cloud(topic_db, topic)
        return yearly_tweets
    raise HTTPException(404, 'Please select from cost, housing and transportation.')


@app.get('/year_sentiment/{topic}')
async def sentiment(topic:str):
    if topic in topics:
        topic_db = db_connect(topic + '_text')
        yearly_sentiment = topic_sentiment(topic_db, topic)
        return yearly_sentiment
    raise HTTPException(404, 'Please select from cost, housing and transportation.')