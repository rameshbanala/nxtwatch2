import {withRouter, Link} from 'react-router-dom'
import {IoSunny, IoMoon} from 'react-icons/io5'
import Popup from 'reactjs-popup'
// import 'reactjs-popup/dist/index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'
import ThemeContext from '../../context/NxtwatchContext'
import {
  NavBar,
  LogoImg,
  ProfileOptionsContainer,
  ProfileOption,
  ProfileImg,
  LogoutBtn,
  LogoutText,
  ButtonContainer,
  PopupBtn,
  ProfileOptionsContainerSm,
  FaBarsIcon,
  MdLogoutIcon,
} from './styledComponents'

class Header extends Component {
  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderNavBar = (isDark, toggleTheme, toggleSidebar) => {
    const logoImgUrl = isDark
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

    const onToggleTheme = () => {
      toggleTheme()
    }

    const onTogglesidebar = () => {
      toggleSidebar()
    }

    return (
      <NavBar isDark={isDark}>
        <Link to="/">
          <LogoImg src={logoImgUrl} alt="website logo" />
        </Link>
        <ProfileOptionsContainer>
          <ProfileOption
            isDark={isDark}
            onClick={onToggleTheme}
            data-testid="theme"
          >
            {isDark ? <IoSunny /> : <IoMoon />}
          </ProfileOption>
          <ProfileOption>
            <ProfileImg
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />
          </ProfileOption>
          <Popup
            modal
            contentStyle={{
              width: '300px',
              height: '150px',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontFamily: 'Roboto',
              justifyContent: 'center',
              backgroundColor: isDark ? '#212121' : '#f1f5f9',
            }}
            trigger={
              <LogoutBtn isDark={isDark} onClick={this.onLogout}>
                Logout
              </LogoutBtn>
            }
          >
            {close => (
              <>
                <LogoutText isDark={isDark}>
                  Are you sure, you want to logout?
                </LogoutText>
                <ButtonContainer>
                  <PopupBtn isDark={isDark} isOutlined onClick={() => close()}>
                    Cancel
                  </PopupBtn>
                  <PopupBtn
                    isDark={isDark}
                    isOutlined={false}
                    onClick={this.onLogout}
                  >
                    Confirm
                  </PopupBtn>
                </ButtonContainer>
              </>
            )}
          </Popup>
        </ProfileOptionsContainer>
        <ProfileOptionsContainerSm>
          <ProfileOption
            isDark={isDark}
            onClick={onToggleTheme}
            data-testid="theme"
          >
            {isDark ? <IoSunny /> : <IoMoon />}
          </ProfileOption>
          <ProfileOption onClick={onTogglesidebar}>
            <FaBarsIcon isDark={isDark} />
          </ProfileOption>
          <Popup
            modal
            contentStyle={{
              width: '300px',
              height: '150px',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontFamily: 'Roboto',
              justifyContent: 'center',
              backgroundColor: isDark ? '#212121' : '#f1f5f9',
            }}
            trigger={
              <ProfileOption>
                <MdLogoutIcon isDark={isDark} />
              </ProfileOption>
            }
          >
            {close => (
              <>
                <LogoutText isDark={isDark}>
                  Are you sure, you want to logout?
                </LogoutText>
                <ButtonContainer>
                  <PopupBtn isDark={isDark} isOutlined onClick={() => close()}>
                    Cancel
                  </PopupBtn>
                  <PopupBtn
                    isDark={isDark}
                    isOutlined={false}
                    onClick={this.onLogout}
                  >
                    Confirm
                  </PopupBtn>
                </ButtonContainer>
              </>
            )}
          </Popup>
        </ProfileOptionsContainerSm>
      </NavBar>
    )
  }

  renderHeader = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDark, toggleTheme, toggleSidebar} = value
        return <>{this.renderNavBar(isDark, toggleTheme, toggleSidebar)}</>
      }}
    </ThemeContext.Consumer>
  )

  render() {
    return this.renderHeader()
  }
}
export default withRouter(Header)
