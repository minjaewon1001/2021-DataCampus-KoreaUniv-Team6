# Face Detection Explained: State-of-the-Art Methods and Best Tools
> * Sciforce / 2021 jun 17
> * url: https://medium.com/sciforce/face-detection-explained-state-of-the-art-methods-and-best-tools-f730fca16294

> facenet에 대해 먼저 공부하기 전에 얼굴 감지, 인식 기술에 대한 간단한 원리와 전반적인 흐름을 보고자 정리한 글이다.    
> 얼굴 인식을 위한 solution에서 우리가 공부하기 좋아보이는 여러 기술들을 발견했다.

## 1. Face detection
얼굴 인식에 있어서 필수적인 부분으로 사진이나 비디오에서 얼굴의 수를 결정함. 이 때 자세한 것은 저장하거나 기억하지 않는다. 

나이나 성별과 같은 인구통계학적 데이터를 정의할 수는 있으나 개개인을 인식하지는 못한다.
## 2. Face recognition
미리 존재하는 얼굴의 데이터베이스로부터 사진이나 영상 속 얼굴을 식별한다. 구별되는 얼굴 특징의 데이터 베이스를 만들려면 실제로 얼굴을 시스템에 등록해야한다. 그런 다음 시스템은 새 이미지를 주요 feature로 나누고 데이터베이스에 저장된 정보과 비교한다.

## 3. Face detection method
사진이나 영상 속에서 배경이나 다른 사물로부터 얼굴을 구별해낸다.
방법은 네 가지 카테고리로 나뉘어진다.

![image](https://user-images.githubusercontent.com/67731178/126887127-e838c408-3650-4b0e-a1db-4be801455db6.png)


### 3.1 Knowledge-based face detection
우리는 눈과 코와 입의 위치를 알고있다. 이렇듯이 얼굴 안에서 어떠한 거리 등의 적절한 규칙의 집합을 규정하여 얼굴을 감지하는 방법이다. 
만약 규칙이 너무 일반적이거나 너무 자세하다면 시스템은 많은 false positive로 귀결된다. (실제로는 아닌데 맞다고 나옴)

그러나 모든 피부색에서 잘 작동하지는 않으며 따라서 조명 환경에 큰 영향을 받는다. 
![image](https://user-images.githubusercontent.com/67731178/126885576-707c3d45-968c-445f-9e4c-a18c67964f1a.png)

### 3.2. template matching
템플릿 매칭 방법은 미리 정의되고 파라미터화된 얼굴 템플릿을 사용하여 input 이미지와의 상관 관계를 통해 얼굴을 찾거나 감지하는 방법이다.
edge 검출 방법을 사용하여 edge로 얼굴 모델을 구성할 수 있다.

변형으로 나온 것이 제어된 배경 기술이다. 정면 얼굴이미지와 일반 배경이 있는 경우 운이 좋으면 배경을 제거하고 얼굴 경계를 남길 수 있다.
![image](https://user-images.githubusercontent.com/67731178/126885674-6d2fe54b-0874-4f88-aad8-51537ca3f1f9.png)

이 접근 방식은 구현하기 쉽지만 일반적으로 얼굴 감지에는 적합하지 않다.

### 3.3. Feature-based face detection
특징 기반 방법은 얼굴의 구조적인 특징을 추출한다. 분류기로서 학습되고 얼굴과 얼굴이 아닌지역을 구별하기 위해 사용된다.

하나의 예시가 color-based face detection인데, 색이있는 이미지나 비디오에서 전형적인 피부색이 있는 영역을 스캔하고 얼굴 부분을 찾는다.

#### Haar Feature Selection
Haar Feature Selection은 얼굴의 특징으로부터 일치를 형성하기 위해 사람의 얼굴의 비슷한 특징에 의존한다. (눈, 입, 콧대 등의 위치나 픽셀 강도의 방향 기울기)

각 정면에서 6061개의 특징을 얻기 위해 38개의 계단식 분류기 레이어가 있다. 

#### HOG
HOG(Histogram of Oriented Gradients)는 객체감지를 위한 특징 추출기이다. 추출된 특징은 이미지의 기울기(방향 기울기), 방향의 분포(히스토그램)이다.

![image](https://user-images.githubusercontent.com/67731178/126885877-3b441e03-4bbc-44ce-a0a9-27cd1404608b.png)

gradients는 일반적으로 크고 둥근 모서리와 코너이며 이 지역을 감지하도록 한다. 픽셀 강도를 고려하는 대신 이미지 세그먼트를 지역화하기 위해 빛 방향을 나타내기 위해 gradient vector의 발생을 계산한다.
이 방법은 중복 로컬 대비 정규화를 사용하여 정확도를 개선한다.

### 3.4. Appearance-based face detection
더욱 발전한 appearance-based method는 얼굴 모델을 찾기 위해 delegate training 얼굴 이미지에 의존한다. 얼굴 이미지의 관련 특성을 찾고 특징을 추출하기 위해 기계학습 및 통계 분석에 의존한다. 이 방법은 여러 알고리즘을 통합한다.

#### Eigenface 기반 알고리즘 
PCA(Principal Component Analysis)를 사용하여 얼굴을 효율적으로 나타낸다. PCA는 데이터의 분산을 가장 잘 설명하는 데이터 세트의 차원을 낮추기 위해 이미지 세트에 적용된다. 이 방법에서 얼굴은 고유면(고유 벡터 집합)의 선형 조합으로 모델링될 수 있다. 이 경우 얼굴 인식은 선형 표현 계수의 비교를 기반으로 한다.

![image](https://user-images.githubusercontent.com/67731178/126886080-cec8fe9a-8213-4039-bfc4-4339fffc99cc.png)

#### Distribution-based algorithms
pca나 Fisher’s Discriminant같은 분포기반 알고리즘은 얼굴 패턴을 나타내는 부분 공간을 정의함. 일반적으로 배경 이미지 패턴에서 대상 패턴 클래스의 인스턴스를 식별하는 훈련된 classifier가 있다. 
#### Hidden Markov Model
detection tasks의 표준 방식. 이 모델의 states는 strips of pixel로 표현된 얼굴의 특징이다.
#### Sparse Network of Winnows
두개의 선형 유닛과 타겟 노드를 정의한다. 하나는 얼굴의 패턴을 위한 것이고 다른 하나는 얼굴이 아닌 것의 패턴을 위한 것이다.
#### Naive Bayes Classifiers
훈련된 이미지 패턴의 series의 등장 빈도수에 기반하여 사진 속에서 나타나는 얼굴의 확률을 계산한다.
#### Inductive learning
가장 구체적인 가설과 일반화로 시작하여 얼굴을 감지하기 위해 Quinlan’s C4.5 or Mitchell’s FIND-S과 같은 알고리즘을 사용한다.
#### Neural networks
GANs같은, Neural networks는 문제 감지(얼굴 감지, 표정 감지, 얼굴 인식 등)에 가장 최근의 그리고 가장 강력한 방법이다.

### Video Processing: Motion-based face detection
비디오 이미지에서 움직임을 가이드로 사용할 수 있다. 특정 얼굴 움직임 중 하나가 깜박이기 때문에 소프트웨어가 규칙적인 깜박임 패턴을 결정할 수 있으면 얼굴을 결정한다.

![image](https://user-images.githubusercontent.com/67731178/126886343-059eb40e-051d-4972-a04a-19cbdd4a5b48.png)

다른 다양한 동작은 벌린 콧구멍, 올라간 눈썹, 주름진 이마, 열린 입과 같이 이미지에 얼굴이 포함될 수 있음을 나타낸다. 얼굴이 감지되고 특정 얼굴 모델이 특정 움직임과 일치하면 모델이 얼굴 위에 놓여 얼굴 추적이 추가 얼굴 움직임을 포착할 수 있다. 최첨단 솔루션은 일반적으로 여러 가지 방법을 결합하여 기계 학습 또는 딥 러닝과 같은 알고리즘에 사용할 기능을 추출한다.

## 4. 오픈 소스 얼굴 감지 솔루션
#### Ageitgey/face_recognition
가장 광범위한 얼굴 인식 라이브러리 중 하나인 40,000개의 별이 있는 GitHub 저장소로 99.38%의 모델 인식 정확도를 가지고 있다.
#### Deepface
나이, 성별, 인종 및 감정과 같은 얼굴 속성 분석을 제공
#### FaceNet (.)
python library를 사용하여 구현. 저장소가 11.8k, 인식 정확도는 99,65%
#### InsightFace (.)
Python 라이브러리, 인식 정확도는 99,86%
#### InsightFace-REST
REST API를 제공하는 것을 목표로...
#### OpenCV
다양한 얼굴 인식 모듈
#### OpenFace (.)
심층 신경망을 사용한 얼굴 인식의 Python 및 Torch 구현. CVPR 2015 논문 FaceNet: A Unified Embedding for Face Recognition and Clustering에 기반을 두고 있다.   
관련 논문 자료 : http://reports-archive.adm.cs.cmu.edu/anon/anon/2016/CMU-CS-16-118.pdf

> *(.)으로 표시한 것은 더 알아보기 좋아보이는 기술들이다.*
