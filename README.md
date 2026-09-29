# SimplyBook.me - Booking and reservations calendar

The SimplyBook.me WordPress plugin which adds the [SimplyBook.me](https://simplybook.me/) booking calendar to a website. Use it to schedule bookings, reservations and appointments, and to collect payments.

- WordPress.org: https://wordpress.org/plugins/simplybook/
- Support: https://wordpress.org/support/plugin/simplybook/
- Documentation: https://help.simplybook.me/index.php?title=WordPress_integration
- GitHub Repository: https://github.com/Really-Simple-Plugins/simplybook/

## About this repository

This repository is the publicly available source code of the SimplyBook.me WordPress plugin, actively maintained by Really Simple Plugins.

## Requirements

- WordPress 6.6 or higher
- PHP 7.4 up to 8.3
- A SimplyBook.me account. You can create a free account on [simplybook.me](https://simplybook.me/), or from this plugin.

## Install a release from GitHub

Releases are made by the Really Simple Plugins team. For every release, the team creates a [GitHub release](https://github.com/Really-Simple-Plugins/simplybook/releases) and adds the packaged zip. This zip is the same package that is published to WordPress.org and can be distributed freely.

1. Open the [releases page](https://github.com/Really-Simple-Plugins/simplybook/releases).
2. Download the `simplybook.zip` asset of the release. Do not download the "Source code" archive. The source code does not contain the built dependencies.
3. In WordPress, go to **Plugins > Add New Plugin > Upload Plugin**.
4. Select the zip file and click **Install Now**, then **Activate**.

## Development

### 1. Set up a local development environment

Requirements:

- PHP 7.4 or higher
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/) (LTS)
- A WordPress site with administrator access.
- Account creation requires a valid HTTPS certificate and a publicly reachable domain. Create an account on [SimplyBook.me](https://simplybook.me/) and log in from the plugin instead, to complete the onboarding on a local environment.

### 2. Clone the repository

Clone the repository into the `wp-content/plugins` folder of your WordPress site.

```bash
cd wp-content/plugins
git clone https://github.com/Really-Simple-Plugins/simplybook.git simplybook
```

### 3. Install the PHP dependencies

```bash
composer install
```

### 4. Install and build the React application

```bash
cd react
npm install
npm run build
npm run build:css
```

Use these commands during development:

| Command |  |
| - | - |
| `npm start` | Build the React application and watch for changes. |
| `npm run build` | Make a production build in `react/build`. |
| `npm run build:css` | Make the Tailwind CSS file `assets/css/tailwind.generated.css`. |
| `npm run build:css:watch` | Make the Tailwind CSS file and watch for changes. |

On Windows, use `npm run win-start` and `npm run win-build`.

### 5. Build the Gutenberg block

```bash
cd assets/block
npm install
npm run build
```

### 6. Code quality

Run these commands from the plugin root. All checks must pass before you open a merge request or pull request.

| Command |  |
| - | - |
| `composer lint` | PHP_CodeSniffer |
| `composer quality` | PHPStan |
| `composer mess` | PHP Mess Detector |

## Contribute

We welcome bug reports, feature requests and pull requests.

### Report a bug or request a feature

- Open a topic on the [WordPress.org support forum](https://wordpress.org/support/plugin/simplybook/).
- We encourage responsible disclosure of vulnerabilities in our plugins. If you believe you have found a vulnerability in our plugin(s), please keep it confidential and report it to support@really-simple-plugins.com in line with our [Coordinated Vulnerability Disclosure Policy](https://really-simple-ssl.com/coordinated-vulnerability-disclosure-policy).

### Submit a change

1. Fork the repository on GitHub.
2. Create a branch from `main`.
3. Make your change. Keep the change small and focused.
4. Run the code quality checks. Fix all reported problems.
5. Write commit messages in the [Conventional Commits](https://www.conventionalcommits.org/) format. Example: `fix: correct the time zone of the booking widget`.
6. Open a pull request against `main`. Describe what the change does and why.

We ask you to not change any version numbers, update the changelog or translation files. The team does this in the release process.

The team reviews the pull request on GitHub. Accepted changes are merged into the GitLab repository. GitLab then mirrors the change back to GitHub. The team credits you in the changelog and closes the pull request on GitHub.

## License

GPL-2.0-or-later. See the `License` header in `simplybook.php` and https://www.gnu.org/licenses/gpl-2.0.html.
