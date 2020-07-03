## CMPT733-Project-Herald: Know the Stock Movement Before It Happens
### Introduction:
In this project, we build up a data science pipeline for stock movement prediction and a real-time prediction web platform.
Specifically, we perform topic modeling on news articles to discover the general topics discussed in news and visualize the frequent words of positive and negative news to observe the similarity of these words with t-SNE.  Besides, we aim at applying NLP methods to generate words embeddings and built the deep learning models based on the crawled news and stocks data to predict future stock price and stock price trend. With CNN+RNN model, we get the best performance of the model with the accuracy rate reaching 58%, outperforming baseline models (52% - 57% of accuracy rate). One of our most important final products is a web application accomplishing two main goals, acquiring the latest news, twitter, and stock dataset from different sources, and achieving real-time process and prediction on the future stock price. This web is designed for investors to get insightful news and tweets associated with each stock ticker and take the predicted stock price as a reference to better make their investing decisions.

### Data Science Pipeline:
**1. Data Collection and Integration:**

**2. Data Preprocessing and Analysis:**
- Topic Modelling
- Sentiment analysis
- Entity Resolution
- Visualizing Word2Vec Word Embeddings using t-SNE
- Twitter Visualization
 <br>

**3. Feature Extraction and Engineering:**
- N-gram model
- Words Embedding
- Documents Embedding
 <br>

**4. Predictive modeling:**
- Baseline model
  - Naive Bayes model
  - Random Forest (RF)
  - Support Vector Machine (SVM)
- Deep Learning model
  - Binary Classification
  - Regression

### Youtube Video
[Video Link](https://youtu.be/b5wkez0ENVk)
