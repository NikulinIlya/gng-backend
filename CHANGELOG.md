# GNG-backend Portal Changelog
All notable changes to GNG Portal will be documented in this file. 

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- AboutInfo, Accessory, Assistant, AssistantPhrase, Brand, Champagne, ChampagneGrape, Cognac, 
EmployeeOffer, Event, EventOrder, Favorite, GrapeSort, Liquor, Location, MainPhrase, Offer, OfferCategory, Order, 
OrderProduct, OrderStatus, Product, Promotion, UserInfo, Vine, Colour, VinesGrape, Vodka, Whiskey models
- Http/Services/ApiControllerService, index, show, setImageField methods
- Controllers/AuthController
- Api/ MainPhraseController, CartController, AboutInfoController, LocationController, AccessoryController, 
AssistantController, AssistantPhraseController, ProductCategoryController, BrandController, ProductController, VineController,
ChampagneController, CognacController, PromotionController, ColourController
- Services/Cart/CartManager, DatabaseCartService, SessionCartService
- Cart, CartItem, ProductCategory models
- login, user, phrases, about-info, assistant-phrases, product-categories, products, brands, vines, champagnes, cognac api routes
- install barryvdh/laravel-debugbar dev dependency
- Localization middleware
- default web route
- lang/{locale?} api route
- GiftIdea, Kit, Rare, Vintage models

### Changed
- Move User model to app/Models

## [0.0.1] - 2020-05-11
### Added
- CHANGELOG file
- Project version in composer.json
- Install barryvdh/laravel-ide-helper, nunomaduro/larastan, tcg/voyager, laravel/sanctum

<!-- Linked versions -->
[Unreleased]: https://github.com/NikulinIlya/gng-backend/compare/0.0.1...HEAD
[0.0.1]: https://github.com/NikulinIlya/gng-backend/releases/tag/0.0.1
