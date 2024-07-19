import {Component} from 'react'
import {IoSearch} from 'react-icons/io5'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import AllOptionsContainer from '../AllOptionsContainer'
import BannerItem from '../BannerItem'
import VideoItem from '../VideoItem'
import {
  HomeContainer,
  MainHomeContainer,
  SearchInputContainer,
  SearchInputEl,
  SearchBtn,
  VideoItemsContainer,
  LoaderContainer,
  NoResultImg,
  NoresultTitle,
  NoresultDesc,
  RetryBtn,
} from './styledComponents'
import ThemeContext from '../../context/NxtwatchContext'

const apiStatusOptions = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'INPROCESS',
}

class Home extends Component {
  state = {
    videosData: [],
    showBanner: true,
    apiStatus: apiStatusOptions.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getVideosList()
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getVideosList()
  }

  removeBanner = () => {
    this.setState({showBanner: false})
  }

  getVideosList = async () => {
    this.setState({apiStatus: apiStatusOptions.inProcess})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(eachItem => ({
        id: eachItem.id,
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
        channel: {
          name: eachItem.channel.name,
          profileImageUrl: eachItem.channel.profile_image_url,
        },
      }))
      this.setState({
        videosData: updatedData,
        apiStatus: apiStatusOptions.success,
      })
    } else {
      this.setState({apiStatus: apiStatusOptions.failure})
    }
  }

  renderLoader = isDark => {
    const color = isDark ? '#ffffff' : '#424242'
    return (
      <LoaderContainer data-testid="loader">
        <Loader type="ThreeDots" color={color} height="50" width="50" />
      </LoaderContainer>
    )
  }

  renderFailure = isDark => {
    const failureImgUrl = isDark
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
    return (
      <LoaderContainer>
        <NoResultImg src={failureImgUrl} alt="failure view" />
        <NoresultTitle isDark={isDark}>
          Oops! something Went Wrong
        </NoresultTitle>
        <NoresultDesc isDark={isDark}>
          We are having some trouble to complete your request.Please try again.
        </NoresultDesc>
        <RetryBtn onClick={this.onClickSearch}>Retry</RetryBtn>
      </LoaderContainer>
    )
  }

  renderSuccess = isDark => {
    const {videosData} = this.state
    const noDataView = videosData.length === 0
    const noresultImgUrl =
      'https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png'
    return (
      <>
        {noDataView ? (
          <LoaderContainer>
            <NoResultImg src={noresultImgUrl} alt="no videos" />
            <NoresultTitle isDark={isDark}>
              No Search results found
            </NoresultTitle>
            <NoresultDesc isDark={isDark}>
              Try different key words or remove search filter
            </NoresultDesc>
            <RetryBtn onClick={this.onClickSearch}>Retry</RetryBtn>
          </LoaderContainer>
        ) : (
          <VideoItemsContainer>
            {videosData.map(eachItem => (
              <VideoItem
                key={eachItem.id}
                videoData={eachItem}
                isDark={isDark}
              />
            ))}
          </VideoItemsContainer>
        )}
      </>
    )
  }

  renderData = isDark => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusOptions.success:
        return this.renderSuccess(isDark)
      case apiStatusOptions.failure:
        return this.renderFailure(isDark)
      case apiStatusOptions.inProcess:
        return this.renderLoader(isDark)
      default:
        return null
    }
  }

  renderMainHomePage = isDark => {
    const {showBanner, searchInput} = this.state
    return (
      <>
        {showBanner && <BannerItem removeBanner={this.removeBanner} />}
        <SearchInputContainer>
          <SearchInputEl
            type="search"
            id="searchInput"
            placeholder="Search"
            isDark={isDark}
            value={searchInput}
            onChange={this.onChangeSearch}
          />
          <SearchBtn
            isDark={isDark}
            onClick={this.onClickSearch}
            data-testid="searchButton"
          >
            <IoSearch />
          </SearchBtn>
        </SearchInputContainer>
        {this.renderData(isDark)}
      </>
    )
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <div>
              <Header />
              <HomeContainer>
                <AllOptionsContainer />
                <MainHomeContainer isDark={isDark} data-testid="home">
                  {this.renderMainHomePage(isDark)}
                </MainHomeContainer>
              </HomeContainer>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Home
