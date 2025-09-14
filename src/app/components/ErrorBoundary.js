"use client"

import { Component } from "react"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })

    // Try to identify if this is a network-related error
    if (error.message && (
      error.message.includes('fetch') ||
      error.message.includes('network') ||
      error.message.includes('CORS') ||
      error.message.includes('Failed to fetch')
    )) {
      console.warn('Network-related error detected. This might be due to antivirus software or network restrictions.')
    }
  }

  render() {
    if (this.state.hasError) {
      const isNetworkError = this.state.error?.message && (
        this.state.error.message.includes('fetch') ||
        this.state.error.message.includes('network') ||
        this.state.error.message.includes('CORS') ||
        this.state.error.message.includes('Failed to fetch')
      )

      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0b0b0f] text-white">
          <div className="text-center p-8 max-w-md">
            <div className="text-6xl mb-4">{isNetworkError ? '🌐' : '⚠️'}</div>
            <h2 className="text-2xl font-bold mb-4">
              {isNetworkError ? 'Network Connection Issue' : 'Something went wrong'}
            </h2>
            <p className="text-gray-400 mb-6">
              {isNetworkError
                ? 'The application encountered a network error. This might be due to antivirus software, firewall settings, or network restrictions blocking external requests.'
                : 'The application encountered an error. This might be due to network issues or browser security settings.'
              }
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full px-6 py-3 bg-accent-gradient text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Reload Page
              </button>
              {isNetworkError && (
                <button
                  onClick={() => {
                    // Try to continue without network features
                    this.setState({ hasError: false, error: null, errorInfo: null })
                  }}
                  className="w-full px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors"
                >
                  Continue Without Network
                </button>
              )}
            </div>
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-400">
                Technical Details
              </summary>
              <pre className="mt-2 text-xs text-gray-600 bg-gray-900 p-3 rounded overflow-auto">
                {this.state.error && this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
