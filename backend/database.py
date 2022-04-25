import couchdb
from functions import topic_switch

address = '172.26.134.35:5984' 
username = 'grp5admin'
password = 'password'
tweets = 'raw_tweets'

def db_connect(dbname):
    """
    """

    couchserver = couchdb.Server('http://' + username + ':' + password + '@' + address)
    try:
      db = couchserver[dbname]
    except:
      db = couchserver.create(dbname)

    return db

def fetch_DB(dbname):
    """
    connect to CouchDB
    params: credentials, db addressm dbname
    return: the db to establish connection with
    return type: database
    """
    
    db = couchdb.Database('http://' + address + '/' + dbname)
    db.resource.credentials = (username, password)

    return db

tweet_db = fetch_DB(tweets)