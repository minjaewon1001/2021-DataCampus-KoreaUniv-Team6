> 논문 주제 : YOLOv3: An Incermetal Improvement
> 
> 논문 리뷰 : https://deep-learning-study.tistory.com/509
> 
> 논문 구현 : https://deep-learning-study.tistory.com/568?category=983681

## 1. Kaggle에서 VOC Dataset 다운로드

#### 1) kaggle API를 활용하면 쉽게 dataset을 다운로드 할 수 있습니다.
kaggle api 다운받는 법 : https://teddylee777.github.io/kaggle/Kaggle-API-%EC%82%AC%EC%9A%A9%EB%B2%95
> 1) kaggle site 접속 https://www.kaggle.com/kimheewon4271/account?isEditing=False
> 2) my account 클릭
> 3) API란에 Create New API Token 클릭
> 참고 (코드로 다운받는법) : https://www.kaggle.com/c/two-sigma-financial-news/discussion/83593#487735

#### 2) 리눅스 명령어

리눅스 pwd 명령어, cd 명령어 사용법 정리 (현재 디렉토리 확인, 디렉토리 이동)
> https://withcoding.com/91

#### 3) Pascal voc dataset used in YOLOv3 video
데이터셋
> https://www.kaggle.com/aladdinpersson/pascal-voc-dataset-used-in-yolov3-video

#### 4) Augmentation
> https://nittaku.tistory.com/272

- 이미지를 부풀려서 성능을 더 좋게 만듬
- VGG 모델에서 많이 사용하고 벤치마킹함
- Augmentation을 넣어주면 기본적으로 성능이 좋아짐

- 1) 좌우반전, 2) 이미지 잘라주기, 3) 밝기 조절 등 수행

## 2. VOC Custom Dataset 생성하기

#### 1) CUDA란?
> https://kaen2891.tistory.com/20
- NVIDIA에서 개발한 GPU 개발 툴
- GPU에서 수행하는 (병렬 처리) 알고리즘을 C 프로그래밍 언어를 비롯한 산업 표준 언어를 사용하여 작성할 수 있도록 하는 GPGPU 기술

어떤 장치를 사용할 것인지 설정함
> device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
> 
> https://jeongwookie.github.io/2020/03/24/200324-pytorch-cuda-gpu-allocate/


#### 
